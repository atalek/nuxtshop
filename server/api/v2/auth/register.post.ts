import User from '~/server/models/userSchema'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const { name, email, password } = <
    {
      name: string
      email: string
      password: string
    }
  >body

  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'All fields are required!',
    })
  } else if (
    typeof email !== 'string' ||
    email.length < 3 ||
    email.length > 31 ||
    !email.includes('@')
  ) {
    throw createError({
      message: 'Invalid email',
      statusCode: 400,
    })
  } else if (
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: 'Invalid password',
      statusCode: 400,
    })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    })
  }

  const user = await User.create({ name, email, password })

  if (user) {
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
    return 'Signed up successfully'
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid user data',
    })
  }
})
