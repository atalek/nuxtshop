export default defineNuxtRouteMiddleware((to, from) => {
  const userData = useCookie('auth')

  if (userData && !userData?.value?.isAdmin) {
    return navigateTo('/')
  }
})
