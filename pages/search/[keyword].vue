<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'
import { useProductStore } from '~/stores/products'

const productStore = useProductStore()
const route = useRoute()
const keyword = route.params.keyword
const isLoading = ref(true)

try {
  isLoading.value = true
  await productStore.searchProducts(keyword)
} catch (error: any) {
  isLoading.value = false
  toast.error(error.data.message)
} finally {
  isLoading.value = false
}
const { products } = storeToRefs(productStore)
</script>

<template>
  <div>
    <NuxtLink to="/" class="btn btn-light mb-3">Go Back</NuxtLink>
    <h1>You searched for: {{ keyword }}</h1>
    <div v-if="isLoading">Loading...</div>
    <div class="row py-3" v-else>
      <div
        v-if="products.length"
        class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
        v-for="product in products"
        :key="product._id">
        <Product :product="product" />
      </div>
      <div v-else class="mt-4">
        <h2>The product you searched for does not exist.</h2>
      </div>
    </div>
  </div>
</template>
