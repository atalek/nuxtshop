export default defineEventHandler(async event => {
  setCookie(event, 'jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  return { statusCode: 200, statusMessage: 'Logged out successfully' }
})
