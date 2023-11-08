import { defineStore } from 'pinia'
import { Product, Review, ProductUpdateData } from '~/types'

export const useProductStore = defineStore({
  id: 'products',
  state: () => ({
    products: [] as Product[],
    product: {} as Product,
    topProducts: [] as Product[],
  }),
  actions: {
    async fetchAllProducts() {
      try {
        const { data } = await useFetch('/api/products')
        if (data.value) {
          this.products = await data.value
        }
      } catch (error) {
        return error
      }
    },
    async fetchProduct(productId: string) {
      try {
        const { data } = await useFetch(`/api/products/product/${productId}`)
        if (data.value) {
          this.product = data.value as Product
        }
      } catch (error) {
        return error
      }
    },

    async fetchTopProducts() {
      try {
        const { data } = await useFetch(`/api/products/top`)
        if (data.value) {
          this.topProducts = data.value as Product[]
        }
      } catch (error) {
        return error
      }
    },
    async searchProducts(keyword: string) {
      try {
        const { data } = await useFetch(`/api/products/search/${keyword}`)
        if (data.value) {
          this.products = data.value as Product[]
        }
      } catch (error) {
        return error
      }
    },
    async createReview(productId: string, data: Review) {
      try {
        await $fetch(`/api/products/product/${productId}/reviews`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (error) {
        throw error
      }
    },
    async updateProduct(productId: string, data: ProductUpdateData) {
      try {
        const response = await $fetch(
          `/api/products/product/${productId}/edit`,
          {
            method: 'PUT',
            body: JSON.stringify(data),
          }
        )

        return response
      } catch (error) {
        throw error
      }
    },
  },
})
