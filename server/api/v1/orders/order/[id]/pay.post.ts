// Update order to paid
// Private

import Order from '~/server/models/orderSchema'

export default defineEventHandler(async event => {
  const user = event.context.user
  const order = await Order.findById(event.context.params?.id)
  const body = await readBody(event)

  if (order) {
    if (body) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: body.id,
        status: 'paid',
        update_time: String(body.created),
        email_address: user?.email,
      }
      const updatedOrder = await order.save()
      return { statusCode: 201, updatedOrder }
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Order not found',
    })
  }
})
