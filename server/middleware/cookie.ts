import jwt from 'jsonwebtoken'
import User from '../models/userSchema'
import { Types } from 'mongoose'

export default defineEventHandler(async event => {
  let token

  token = getCookie(event, 'jwt')

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: Types.ObjectId
    }
    const user = await User.findById(decoded.userId).select('-password').lean()

    setCookie(event, 'auth', JSON.stringify(user))
  }
})
