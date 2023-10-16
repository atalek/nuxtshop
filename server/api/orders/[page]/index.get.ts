// Get all orders
// Private

import Order from '~/server/models/orderSchema'
import { Order as Orderr } from '~/types'

export default defineEventHandler(async event => {
  const user = event.context.user
  const pageSize = 10
  const page = Number(event.context.params?.page)

  const count = await Order.countDocuments()

  if (user && user.isAdmin) {
    const orders: Orderr[] = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('user', 'id name')

    return { orders, page, pages: Math.ceil(count / pageSize) }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied,not an admin',
    })
  }
})
