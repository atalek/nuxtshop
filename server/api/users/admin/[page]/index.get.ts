// Get all orders
// Private

import User from '~/server/models/userSchema'
import { UserI } from '~/server/models/userSchema'

export default defineEventHandler(async event => {
  const user = event.context.user
  const pageSize = 10
  const page = Number(event.context.params?.page)

  const count = await User.countDocuments()

  if (user && user.isAdmin) {
    const users: UserI[] = await User.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    return { users, page, pages: Math.ceil(count / pageSize) }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied,not an admin',
    })
  }
})
