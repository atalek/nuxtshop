import User from '~/server/models/userSchema'
import { lucia } from '~/server/utils/auth'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const { email, password } = <{ email: string; password: string }>body

  try {
    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
      const session = await lucia.createSession(user._id, {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
      appendHeader(
        event,
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
      )

      return 'Logged in successfully'
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
