import jwt from 'jsonwebtoken'
import User from '../models/userSchema'
import { Types } from 'mongoose'

export default defineEventHandler(async event => {
  const route = event.node.req.url as string

  const excludedRoutes = [
    '/api/users/login',
    '/api/users/register',
    '/api/users/logout',
    '/api/products/create',
  ]

  if (
    (!excludedRoutes.includes(route) && route.startsWith('/api/orders')) ||
    route.startsWith('/api/users/profile') ||
    route.startsWith('/api/users/admin/') ||
    route.startsWith('/api/products/admin') ||
    route.startsWith('/api/products/create') ||
    route.endsWith('/edit') ||
    route.endsWith('/reviews') ||
    route.endsWith('/delete') ||
    route.endsWith('/admin')
  ) {
    let token

    token = getCookie(event, 'jwt')

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: Types.ObjectId
        }
        const user = await User.findById(decoded.userId).select('-password')

        event.context.user = user
      } catch (error) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Not authorized, token failed',
        })
      }
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized, no token',
      })
    }
  }
})
