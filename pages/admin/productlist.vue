<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/stores/auth'
import formatPrice from '~/utils/formatter'

const authStore = useAuthStore()

const page = ref(1)

const { data, refresh } = await useAsyncData(
  'products',

  () =>
    $fetch(`/api/products/admin/${page.value}`, {
      params: {
        page: page.value,
      },
    }),
  { watch: [page] }
)

function refetch(pageNumber: number) {
  page.value = pageNumber
}

async function createProduct() {
  if (authStore.userInfo && authStore.userInfo.isAdmin) {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await $fetch('/api/products/create', { method: 'POST' })
        refresh()
        toast.success('Product created')
      } catch (error: any) {
        toast.error(error.statusMessage)
      }
    }
  }
}

async function deleteHandler(productId: string) {
  if (authStore.userInfo.isAdmin) {
    try {
      await $fetch(`/api/products/product/${productId}/delete`, {
        method: 'POST',
      })
      refresh()
      toast.success('Product deleted')
    } catch (error: any) {
      toast.error(error.statusMessage)
    }
  }
}

watchEffect(() => {
  if (!authStore.userInfo || !authStore.userInfo.isAdmin) {
    navigateTo('/login')
  }
})
</script>

<template>
  <Title>{{ 'Products | Admin' }}</Title>

  <div class="row align-items-center">
    <div class="col">
      <h1>Products</h1>
    </div>
    <div class="col text-end">
      <button class="btn btn-primary btn-sm m-3" @click="createProduct">
        <Icon name="ri:edit-box-line" /> Create product
      </button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped responsive">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">PRICE</th>
          <th scope="col">STOCK</th>
          <th scope="col">CATEGORY</th>
          <th scope="col">BRAND</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in data!.products" :key="product._id">
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ formatPrice(product.price) }}</td>
          <td>{{ product.countInStock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.brand }}</td>
          <td>
            <NuxtLink :to="`/admin/product/${product._id}`">
              <button class="btn btn-light btn-sm mx-2">
                <Icon name="fa6-solid:pen-to-square" />
              </button>
            </NuxtLink>
          </td>
          <td>
            <button
              class="btn btn-danger btn-sm mx-2"
              @click="deleteHandler(product._id)"
            >
              <Icon style="color: white" name="bi:trash-fill" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginate @change="refetch" :pages="data!.pages" :page="page" />
  </div>
</template>

<style scoped></style>
