export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()
  const data = await useRequestFetch()('/api/v2/user')
  if (data) {
    user.value = data
  }
})
