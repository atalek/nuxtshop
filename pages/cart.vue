<script setup>
import { useCartStore } from '~/stores/cart'
import formatPrice from '~/utils/formatter'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)

watch(
  () => cartItems,
  () => {
    cartStore.saveCartToLocalStorage()
  },
  { deep: true },
)
</script>

<template>
  <div class="row">
    <Title>{{ 'Cart' }}</Title>
    <div class="col-md-8">
      <h1 class="my-2">Shopping Cart</h1>
      <div v-if="cartItems.length === 0">
        <p class="my-4 alert alert-danger" role="alert">Your cart is empty</p>

        <NuxtLink to="/" class="btn btn-light my-1">Start shopping</NuxtLink>
      </div>
      <div v-else class="list-group list-group-flush">
        <div
          v-for="item in cartItems"
          :key="item.product._id"
          class="list-group-item d-flex justify-content-between">
          <div class="row align-items-center w-100">
            <div class="col-md-2 my-1">
              <NuxtImg
                provider="cloudinary"
                :src="item.product?.image"
                :alt="`image of ${item.product.name}`"
                class="img-fluid rounded" />
            </div>
            <div class="col-md-3">
              <NuxtLink :to="`/product/${item.product._id}`">{{
                item.product.name
              }}</NuxtLink>
            </div>
            <div class="col-md-2 mt-3">${{ item.product.price }}</div>
            <div class="col-md-2">
              <select class="form-control" v-model="item.qty">
                <option
                  v-for="x in item.product.countInStock"
                  :key="x"
                  :value="x">
                  {{ x }}
                </option>
              </select>
            </div>
            <div class="col-md-2">
              <button
                class="btn btn-danger w-100"
                @click="cartStore.removeItem(item.product)">
                <Icon name="fa6-solid:trash" style="color: white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4" v-if="cartStore.totalCount > 0">
      <div class="card mt-4">
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <h2 class="mb-0">
              Subtotal {{ cartStore.totalCount }}
              {{ cartStore.totalCount === 1 ? 'item' : 'items' }}:
            </h2>
            <h2>{{ formatPrice(cartStore.subTotal) }}</h2>
          </div>
          <div class="list-group-item">
            <button
              class="btn btn-primary w-100"
              :disabled="cartStore.totalCount === 0"
              @click="cartStore.checkout">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
