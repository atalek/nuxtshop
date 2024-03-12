// Get logged in user order
// Private

import Order from '~/server/models/orderSchema'

export default defineEventHandler(async event => {
  const user = event.context.user

  const orders = await Order.find({ user: user?.id }).sort({ createdAt: -1 })

  return orders
})
