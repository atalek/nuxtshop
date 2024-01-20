<script lang="ts" setup>
const page = ref(1)

const { data } = await useAsyncData(
  'products',
  () =>
    $fetch(`/api/products/${page.value}`, {
      params: {
        page: page.value,
      },
    }),
  { watch: [page] },
)

function refetch(pageNumber: number) {
  page.value = pageNumber
}
</script>

<template>
  <div>
    <ProductCarousel />

    <h1>Latest Products</h1>
    <div class="row py-3">
      <div
        class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
        v-for="product in data!.products"
        :key="product._id">
        <Product :product="product" />
      </div>
      <Paginate @change="refetch" :pages="data!.pages" :page="page" />
    </div>
  </div>
</template>
