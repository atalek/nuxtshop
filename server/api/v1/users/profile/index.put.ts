import User from '~/server/models/userSchema'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const user = await User.findById(body._id)

  if (user) {
    user.name = body.name || user.name
    user.email = body.email || user.email

    if (body.password) {
      user.password = body.password
    }

    await user.save()

    return 'Profile Updated'
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
})
