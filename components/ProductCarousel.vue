<script lang="ts" setup>
import { useProductStore } from '~/stores/products'

const productStore = useProductStore()
await productStore.fetchTopProducts()

const products = computed(() => productStore.topProducts)
</script>

<template>
  <div
    id="carouselExampleDark"
    class="carousel carousel-dark slide mb-2"
    data-bs-ride="carousel"
  >
    <div class="carousel-indicators">
      <button
        v-for="(product, index) in products"
        :key="index"
        :data-bs-target="'#carouselExampleDark'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        aria-label="Slide {{ index + 1 }}"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(product, index) in products"
        :key="product._id"
        :class="['carousel-item', { active: index === 0 }]"
        :data-bs-interval="index === 0 ? 5000 : 3000"
      >
        <NuxtLink :to="`/product/${product._id}`">
          <NuxtImg
            provider="cloudinary"
            :src="product.image"
            class="d-block caroimg img-fluid"
            :alt="product.name"
          />
          <div class="carousel-caption">
            <h2 class="text-white">{{ product.name }}</h2>
            <p class="text-white">{{ `$${product.price}` }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.caroimg {
  width: 100%;
  max-height: 480px;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.25);
}
</style>
