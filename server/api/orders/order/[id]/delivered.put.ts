// Update order to delivered
// Private admin route

import Order from '~/server/models/orderSchema'

export default defineEventHandler(async event => {
  const user = event.context.user

  if (user && user.isAdmin) {
    const order = await Order.findById(event.context.params?.id)

    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      const updatedOrder = await order.save()

      return updatedOrder
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Order not found',
      })
    }
  }
})
