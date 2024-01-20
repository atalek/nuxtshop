export default defineNuxtRouteMiddleware((to, from) => {
  const userData = useCookie('auth')

  if (userData.value === undefined) {
    return navigateTo('/login')
  }
})
