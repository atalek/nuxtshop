<script lang="ts" setup>
const { data: products, status } = await useFetch('/api/v1/products/top', {
  server: true,
  lazy: true,
})
</script>

<template>
  <div
    v-if="status === 'pending'"
    class="skeleton"></div>
  <div
    v-else
    id="carouselExampleDark"
    class="carousel carousel-dark slide mb-2"
    data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(product, index) in products"
        :key="product._id.toString()"
        :class="['carousel-item', { active: index === 0 }]"
        :data-bs-interval="index === 0 ? 5000 : 3000">
        <NuxtLink :to="`/product/${product._id}`">
          <div class="image-container">
            <NuxtImg
              provider="cloudinary"
              :src="product.image"
              class="d-block caroimg img-fluid"
              :alt="product.name"
              height="480"
              width="480"
              format="webp"
              fetchpriority="high" />
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
.skeleton {
  background: #f0f0f0;
  height: 480px;
  width: 100%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}
</style>
