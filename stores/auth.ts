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
        const res = await $fetch('/api/users/login', {
          method: 'POST',
          body: data,
        })
        if (res) {
          this.nuxtClientInit(res)
          return res
        }
      } catch (error: any) {
        throw error
      }
    },
    async register(data: User) {
      try {
        const res = await $fetch('/api/users/register', {
          method: 'POST',
          body: data,
        })
        if (res) {
          this.nuxtClientInit(res)
          return res
        }
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
        // @ts-ignore
        this.userInfo = {}
      } catch (error: any) {
        throw error
      }
    },
    async updateProfile(data: User) {
      try {
        const res = await $fetch('/api/users/profile', {
          method: 'PUT',
          body: data,
        })
        if (res) {
          this.userInfo = res
        }
      } catch (error: any) {
        throw error
      }
    },

    clearLocalStorage() {
      localStorage.removeItem('cart')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      localStorage.removeItem('expirationTime')

      // @ts-ignore
      this.userInfo = undefined
    },
    nuxtClientInit(value: UserInfo) {
      this.userInfo = value
    },
  },
})
