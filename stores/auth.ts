import { defineStore } from 'pinia'
import { UserInfo, LoginInfo, User } from '~/types'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userInfo: {} as UserInfo,
  }),

  actions: {
    async login(data: LoginInfo) {
      try {
        const response = await $fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify(data),
        })
        const user: UserInfo = response
        this.setCredentials(user)

        return user
      } catch (error: any) {
        throw error
      }
    },
    async register(data: User) {
      try {
        const response = await $fetch('/api/users/register', {
          method: 'POST',
          body: JSON.stringify(data),
        })
        const user: UserInfo = response
        this.setCredentials(user)

        return user
      } catch (error: any) {
        throw error
      }
    },
    async logout() {
      try {
        await $fetch('/api/users/logout', {
          method: 'POST',
        })
        this.clearLocalStorage()
      } catch (error: any) {
        throw error
      }
    },
    async updateProfile(data: User) {
      try {
        const response = await $fetch('/api/users/profile', {
          method: 'PUT',
          body: JSON.stringify(data),
        })
        const user = response
        this.setCredentials(user)

        return user
      } catch (error: any) {
        throw error
      }
    },
    setCredentials(data: UserInfo) {
      this.userInfo = data
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    clearLocalStorage() {
      localStorage.removeItem('cart')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      localStorage.removeItem('expirationTime')

      // @ts-ignore
      this.userInfo = {}
    },
    nuxtClientInit() {
      const storedUserInfo = localStorage.getItem('userInfo')
      if (storedUserInfo) {
        this.userInfo = JSON.parse(storedUserInfo)
      }
    },
  },
})
