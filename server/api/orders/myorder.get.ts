// Get logged in user order
// Private

import Order from '~/server/models/orderSchema'

export default defineEventHandler(async event => {
  const user = event.context.user
  const userId = user._id.toString()

  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 })

  return orders
})
