import { defineStore } from 'pinia'
import { UserInfo, LoginInfo } from '~/types'
import { User } from 'lucia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userInfo: null as User | null,
  }),

  actions: {
    async login(data: LoginInfo) {
      try {
        const res = await $fetch('/api/v2/auth/login', {
          method: 'POST',
          body: data,
        })
        if (res) {
          window.location.reload()
          return 'Logged in'
        }
      } catch (error: unknown) {
        throw error
      }
    },
    async register(data: User) {
      try {
        const res = await $fetch('/api/v2/auth/register', {
          method: 'POST',
          body: data,
        })
        if (res) {
          window.location.reload()
          return 'Registered successfully'
        }
      } catch (error: unknown) {
        throw error
      }
    },
    async logout() {
      try {
        await $fetch('/api/v2/auth/logout', {
          method: 'POST',
        })
        this.clearLocalStorage()
        window.location.reload()
      } catch (error: any) {
        throw error
      }
    },
    async updateProfile(data: User) {
      try {
        const res = await $fetch('/api/v1/users/profile', {
          method: 'PUT',
          body: data,
        })
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
    loadUser(value: User) {
      if (value) this.userInfo = value
    },
  },
})
