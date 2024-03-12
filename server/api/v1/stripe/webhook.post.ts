import Stripe from 'stripe'
import Order from '~/server/models/orderSchema'

export default defineEventHandler(async event => {
  const body = await readRawBody(event)

  const stripeSignature = getHeader(event, 'stripe-signature')

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  })

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    )

    if (stripeEvent.type === 'checkout.session.completed') {
      const orderId = stripeEvent?.data?.object?.metadata?.orderId
      const isPaid = stripeEvent?.data?.object?.payment_status === 'paid'

      if (isPaid) {
        const updateResult = await Order.updateOne(
          { _id: orderId },
          { isPaid: true, paidAt: Date.now() },
        )
      }
    }
    return 'ok'
  } catch (error) {
    throw error
  }
})
