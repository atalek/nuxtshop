// Get order by ID
// Private

import Order from '~/server/models/orderSchema'

export default defineEventHandler(async event => {
  const id = event.context.params?.id

  const order = await Order.findById(id).populate('user', 'name email')

  if (order) {
    return order
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Order not found',
    })
  }
})
