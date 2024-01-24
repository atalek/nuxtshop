import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  })

  const orderId = body._id
  const { shippingAddress, user, orderItems } = body

  const stripeLineItems = orderItems.map(orderItem => {
    const unitAmountWithTax = Math.round(orderItem.price * 1.1 * 100)
    return {
      quantity: orderItem.qty,
      price_data: {
        currency: 'USD',
        product_data: {
          name: orderItem.name,
        },
        unit_amount: unitAmountWithTax,
      },
    }
  })

  const totalOrderAmount = orderItems.reduce(
    (total, item) => total + item.price * item.qty * 100,
    0,
  )

  const shippingFee = totalOrderAmount > 5000 ? 0 : 1000

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: user.email,
    success_url: process.env.BASE_URL + `/order/${orderId}?success=1`,
    cancel_url: process.env.BASE_URL + `/order/${orderId}?canceled=1`,
    metadata: {
      orderId: orderId.toString(),
    },

    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: shippingFee, currency: 'USD' },
        },
      },
    ],
  })

  return stripeSession.url
})
