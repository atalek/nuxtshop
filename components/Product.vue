<script lang="ts" setup>
import type { ProductType } from '~/types'
defineProps({
  product: {
    type: Object as PropType<ProductType>,
    required: true,
  },
})

const imageLoaded = ref(false)

function onImageLoad() {
  imageLoaded.value = true
}
</script>

<template>
  <div class="card p-3 mb-3 rounded">
    <NuxtLink :to="`/product/${product._id}`">
      <div class="ratio ratio-4x3">
        <NuxtImg
          provider="cloudinary"
          :src="product.image"
          class="card-img-top"
          :alt="`An image of ${product.name}`" />
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

<style scoped>
.product-title .product-name:hover::after {
  content: attr(data-full-title);
  position: absolute;
  background-color: rgba(133, 132, 132, 0.4);
  color: rgb(90, 90, 90);
  padding: 5px;
  border-radius: 5px;
  width: auto;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  clear: both;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;
  display: none;
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
}

.product-title:hover .product-name:hover::after {
  display: block;
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

img {
  object-fit: contain;
}
</style>
