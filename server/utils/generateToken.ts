import jwt from 'jsonwebtoken'

const generateToken = (event, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  })

  // Set JWT as HTTP-Only cookie
  setCookie(event, 'jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_EVN !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60,
  })
}

export default generateToken
