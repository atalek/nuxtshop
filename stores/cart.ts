import { defineStore } from 'pinia'
import type { ProductType, CartItem, ShippingAddress } from '~/types'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: [] as CartItem[],
    shippingAddress: {} as ShippingAddress | {},
    paymentMethod: 'Credit Card',
  }),
  getters: {
    totalCount(): number {
      return this.items.reduce((acc, item) => acc + item.qty, 0)
    },

    subTotal(): number {
      const totalPrice = this.items.reduce((acc, item) => {
        return acc + item.product.price * item.qty
      }, 0)

      return totalPrice
    },

    taxTotal(): number {
      return this.subTotal * 0.1
    },
    shippingPrice(): number {
      let deliveryCost: number = 10
      if (this.subTotal > 50) {
        deliveryCost = 0
        return deliveryCost
      }
      return deliveryCost
    },
    total(): number {
      return this.subTotal + this.taxTotal + this.shippingPrice
    },
  },
  actions: {
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(this.shippingAddress),
      )
      localStorage.setItem('paymentMethod', JSON.stringify(this.paymentMethod))
    },

    loadCart() {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        this.items = JSON.parse(storedCart)
      }
      const storedAddress = localStorage.getItem('shippingAddress')
      if (storedAddress) {
        this.shippingAddress = JSON.parse(storedAddress)
      }
      const storedPayment = localStorage.getItem('paymentMethod')
      if (storedPayment) {
        this.paymentMethod = JSON.parse(storedPayment)
      }
    },

    addItem(item: ProductType) {
      const existingItem = this.items.find(i => i.product._id === item._id)
      if (existingItem) {
        existingItem.qty++
      } else {
        const newItem = { product: item, qty: 1 }
        this.items.push(newItem)
      }

      navigateTo('/cart')
      this.saveCartToLocalStorage()
    },

    removeItem(item: ProductType) {
      const existingItemIndex = this.items.findIndex(
        i => i.product._id === item._id,
      )
      if (existingItemIndex !== -1) {
        this.items.splice(existingItemIndex, 1)
      }
      this.saveCartToLocalStorage()
    },
    saveShippingAddress(address: ShippingAddress) {
      this.shippingAddress = address
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(this.shippingAddress),
      )
    },
    savePaymentMethod(paymentMethod: string) {
      this.paymentMethod = paymentMethod
      localStorage.setItem('paymentMethod', JSON.stringify(this.paymentMethod))
    },
    checkout() {
      navigateTo('/login?redirect=/shipping')
    },
    clearCart() {
      localStorage.removeItem('cart')
      this.items = []
    },

    clear() {
      this.items = []
      this.shippingAddress = {}
      this.paymentMethod = 'PayPal'
    },
  },
})
