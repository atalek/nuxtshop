// private admin route
// get all users

import User from '~/server/models/userSchema'

export default defineEventHandler(async event => {
  const userr = event.context.user
  const id = event.context.params?.id

  if (userr && userr.isAdmin) {
    const user = await User.findById(id).select('-password').exec()
    if (user) {
      if (user.isAdmin) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Cannot delete an admin user',
        })
      }

      await User.deleteOne({ _id: user.id })
      return { status: 200, message: 'User deleted successfully' }
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
