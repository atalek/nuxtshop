// private admin route
// get all users

import User from '~/server/models/userSchema'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const userr = event.context.user
  const id = event.context.params?.id

  const { name, email, isAdmin } = body as {
    name: string
    email: string
    isAdmin: boolean
  }

  if (userr && userr.isAdmin) {
    const user = await User.findById(id).select('-password')

    if (user) {
      user.name = name || user.name
      user.email = email || user.email
      user.isAdmin = isAdmin || user.isAdmin

      const updatedUser = await user.save()

      return {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      }
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }
  }
})
