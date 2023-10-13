// private admin route
// get all users

import User from '~/server/models/userSchema'

export default defineEventHandler(async event => {
  const userr = event.context.user
  const id = event.context.params?.id

  if (userr && userr.isAdmin) {
    const user = await User.findById(id).select('-password')
    if (user) {
      return user
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied,not an admin',
    })
  }
})
