import { defineStore } from 'pinia'
import type { UserInfo, UpdateUserData } from '~/types'

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    user: {} as UserInfo,
  }),
  actions: {
    async fetchSingleUser(userId: string) {
      try {
        const response = await $fetch(`/api/v1/users/admin/user/${userId}`, {
          method: 'GET',
        })
        this.user = response as UserInfo
      } catch (error) {
        throw error
      }
    },
    async updateUser(userId: string, data: UpdateUserData) {
      try {
        const response = await $fetch(`/api/v1/users/admin/user/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        })

        return response
      } catch (error) {
        throw error
      }
    },
    async deleteUser(userId: string) {
      try {
        await $fetch(`/api/v1/users/admin/user/${userId}`, { method: 'DELETE' })
      } catch (error) {
        throw error
      }
    },
  },
})
