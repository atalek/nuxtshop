<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'
import formatPrice from '~/utils/formatter'

const authStore = useAuthStore()

const page = ref(1)

const { data, error } = await useAsyncData(
  'orders',

  () =>
    $fetch(`/api/orders/${page.value}`, {
      params: {
        page: page.value,
      },
    }),
  { watch: [page] }
)

function refetch(pageNumber: number) {
  page.value = pageNumber
}

watchEffect(() => {
  if (error.value && error.value.statusCode === 403) {
    authStore.logout()
  }
  if (!authStore.userInfo || !authStore.userInfo.isAdmin) {
    navigateTo('/login')
  }
})
</script>

<template>
  <Title>{{ 'Orders | Admin' }}</Title>

  <h1>Orders</h1>
  <div class="table-responsive">
    <table class="table table-striped responsive">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">USER</th>
          <th scope="col">DATE</th>
          <th scope="col">TOTAL</th>
          <th scope="col">PAID</th>
          <th scope="col">DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in data!.orders" :key="order._id">
          <th scope="row">{{ order._id }}</th>
          <td>{{ order?.user?.name }}</td>
          <td>{{ order.createdAt.substring(0, 10) }}</td>
          <td>{{ formatPrice(order.totalPrice) }}</td>
          <td>
            <template v-if="order.isPaid">
              {{ order.paidAt.substring(0, 10) }}
            </template>
            <template v-else>
              <Icon name="heroicons-solid:x" style="color: red" />
            </template>
          </td>
          <td>
            <template v-if="order.isDelivered">
              {{ order.deliveredAt.substring(0, 10) }}
            </template>
            <template v-else>
              <Icon name="heroicons-solid:x" style="color: red" />
            </template>
          </td>
          <td>
            <NuxtLink :to="`/order/${order._id}`">
              <button class="btn btn-sm btn-primary">Details</button></NuxtLink
            >
          </td>
        </tr>
      </tbody>
    </table>
    <Paginate @change="refetch" :pages="data!.pages" :page="page" />
  </div>
</template>

<style scoped></style>
