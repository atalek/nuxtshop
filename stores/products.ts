import { defineStore } from 'pinia'
import type { ProductType, Review, ProductUpdateData } from '~/types'

export const useProductStore = defineStore({
  id: 'products',
  state: () => ({
    products: [] as ProductType[],
    product: {} as ProductType,
    topProducts: [] as ProductType[],
  }),
  actions: {
    async fetchAllProducts() {
      try {
        const { data } = await useFetch('/api/v1/products')
        if (data.value) {
          // @ts-ignore
          this.products = await data.value
        }
      } catch (error) {
        return error
      }
    },
    async fetchProduct(productId: string) {
      try {
        const { data } = await useFetch(`/api/v1/products/product/${productId}`)
        if (data.value) {
          this.product = data.value as ProductType
        }
      } catch (error) {
        return error
      }
    },

    async fetchTopProducts() {
      try {
        const { data } = await useFetch(`/api/v1/products/top`)
        if (data.value) {
          this.topProducts = data.value as ProductType[]
        }
      } catch (error) {
        return error
      }
    },
    async searchProducts(keyword: string) {
      try {
        const { data } = await useFetch(`/api/v1/products/search/${keyword}`)
        if (data.value) {
          this.products = data.value as ProductType[]
        }
      } catch (error) {
        return error
      }
    },
    async createReview(productId: string, data: Review) {
      try {
        await $fetch(`/api/v1/products/product/${productId}/reviews`, {
          method: 'POST',
          body: data,
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (error) {
        throw error
      }
    },
    async updateProduct(productId: string, data: ProductUpdateData) {
      try {
        const response = await $fetch(
          `/api/v1/products/product/${productId}/edit`,
          {
            method: 'PUT',
            body: JSON.stringify(data),
          },
        )

        return response
      } catch (error) {
        throw error
      }
    },
  },
})
