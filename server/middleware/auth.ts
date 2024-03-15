export default defineEventHandler(async event => {
  const route = event.node.req.url as string

  const excludedRoutes = [
    '/api/v2/auth/login',
    '/api/v2/auth/register',
    '/api/v2/auth/logout',
    '/api/v2/user',
    '/api/v1/products/create',
  ]

  if (
    (!excludedRoutes.includes(route) && route.startsWith('/api/v1/orders')) ||
    route.startsWith('/api/v1/users/profile') ||
    route.startsWith('/api/v1/users/admin/') ||
    route.startsWith('/api/v1/products/admin') ||
    route.startsWith('/api/v1/products/create') ||
    route.endsWith('/edit') ||
    route.endsWith('/reviews') ||
    route.endsWith('/delete') ||
    route.endsWith('/admin')
  ) {
    const user = event.context.user
    const session = event.context.session

    if (!user || !session) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized, no token',
      })
    }
  }
})
