<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useProductStore } from '~/stores/products'

const productStore = useProductStore()
await productStore.fetchTopProducts()

const products = computed(() => productStore.topProducts)
const imageLoaded = ref<Record<string, boolean>>({})

function onImageLoad(id: string) {
  imageLoaded.value[id] = true
}
</script>

<template>
  <div
    id="carouselExampleDark"
    class="carousel carousel-dark slide mb-2"
    data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        v-for="(product, index) in products"
        :key="index"
        :data-bs-target="'#carouselExampleDark'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        aria-label="Slide {{ index + 1 }}"></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(product, index) in products"
        :key="product._id.toString()"
        :class="['carousel-item', { active: index === 0 }]"
        :data-bs-interval="index === 0 ? 5000 : 3000">
        <NuxtLink :to="`/product/${product._id}`">
          <div class="image-container">
            <div
              class="placeholder"
              v-if="!imageLoaded[product._id]"></div>
            <NuxtImg
              provider="cloudinary"
              :src="product.image"
              class="d-block caroimg img-fluid"
              :alt="product.name"
              @load="onImageLoad(product._id)"
              :class="{
                'opacity-100': imageLoaded[product._id],
                'opacity-0': !imageLoaded[product._id],
              }" />
          </div>
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
      data-bs-slide="prev">
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="next">
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
}

.caroimg {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: contain;
  transition: opacity 0.5s ease-in-out;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.25);
}
</style>
