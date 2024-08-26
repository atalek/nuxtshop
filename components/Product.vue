<script lang="ts" setup>
import type { ProductType } from '~/types'
defineProps({
  product: {
    type: Object as PropType<ProductType>,
    required: true,
  },
})
</script>

<template>
  <div class="card p-3 mb-3 rounded">
    <NuxtLink :to="`/product/${product._id}`">
      <div class="ratio ratio-4x3 product-image">
        <NuxtImg
          provider="cloudinary"
          :src="product.image"
          class="card-img-top"
          :alt="`An image of ${product.name}`"
          loading="lazy" />
      </div>
    </NuxtLink>
    <div class="card-body">
      <NuxtLink :to="`/product/${product._id}`">
        <div class="card-title product-title">
          <strong
            class="product-name"
            :data-full-title="product?.name"
            >{{ product.name }}</strong
          >
        </div>
      </NuxtLink>
      <div class="card-text">
        <Rating
          :value="product.rating"
          :text="`${product.numReviews} reviews`" />
      </div>
      <p class="card-text fs-4">${{ product.price }}</p>
    </div>
  </div>
</template>
