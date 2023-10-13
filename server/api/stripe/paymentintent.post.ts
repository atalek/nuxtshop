import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16',
  })

  return await stripe.paymentIntents.create({
    amount: Number(Math.ceil(body.amount)),
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  })
})
