import User from '~/server/models/userSchema'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const { email, password } = body as {
    email: string
    password: string
  }

  try {
    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
      generateToken(event, user._id)

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      })
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data.message || 'An error occurred',
    })
  }
})
