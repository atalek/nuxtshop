import { defineStore } from 'pinia'
import type { PlaceOrder, Order, PaymentIntent } from '~/types'

export const useOrderStore = defineStore({
  id: 'order',
  actions: {
    async placeOrder(order: PlaceOrder) {
      try {
        const response = await $fetch('/api/v1/orders', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: { 'Content-Type': 'application/json' },
        })

        if (response) {
          // @ts-ignore
          const orderId: string = response.createdOrder._id as string
          navigateTo(`/order/${orderId}`)
        }
      } catch (error) {
        throw error
      }
    },
    async fetchMyOrders(): Promise<Order[]> {
      try {
        const response = await $fetch('/api/v1/orders/myorder')

        return response as Order[]
      } catch (error) {
        throw error
      }
    },
    async fetchSingleOrder(orderId: string) {
      try {
        const { data, pending, error, refresh } = await useFetch(
          `/api/v1/orders/order/${orderId}`,
        )

        return { data, pending, error, refresh }
      } catch (error) {
        throw error
      }
    },
    async payOrder(orderId: string, paymentIntent: PaymentIntent) {
      try {
        await $fetch(`/api/v1/orders/order/${orderId}/pay`, {
          method: 'POST',
          body: paymentIntent,
        })
      } catch (error) {
        throw error
      }
    },
    async deliverOrder(orderId: string) {
      try {
        await $fetch(`/api/v1/orders/order/${orderId}/delivered`, {
          method: 'PUT',
        })
      } catch (error) {
        throw error
      }
    },
  },
})
