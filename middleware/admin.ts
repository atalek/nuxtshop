export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()

  if (!user.value || !user?.value?.isAdmin) {
    return navigateTo('/')
  }
})
