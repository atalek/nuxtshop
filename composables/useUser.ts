import type { User } from 'lucia'
import { useAuthStore } from '~/stores/auth'

export const useUser = () => {
  const authStore = useAuthStore()
  const user = useState<User | null>('user', () => null)
  authStore.loadUser(user.value)

  return user
}
