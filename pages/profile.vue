<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/order'
import { toast } from 'vue3-toastify'
import formatPrice from '~/utils/formatter'
import { UserInfo } from '~/types'

definePageMeta({
  middleware: 'unauthenticated',
})

const authStore = useAuthStore()
const orderStore = useOrderStore()

const orders = await orderStore.fetchMyOrders()

const userInfo = computed(() => authStore.userInfo as UserInfo)

const name = ref(userInfo.value.name)
const email = ref(userInfo.value.email)
const password = ref('')
const confirmPassword = ref('')

async function submitHandler() {
  if (password.value !== confirmPassword.value) {
    toast.error('Passwords do not match')
  } else {
    const userData = {
      _id: userInfo.value._id,
      name: name?.value,
      email: email?.value,
      password: password?.value,
    }
    try {
      await authStore.updateProfile(userData)
      password.value = ''
      confirmPassword.value = ''
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error(error.data.message)
    }
  }
}
</script>

<template>
  <div>
    <Title>{{ userInfo.name }}</Title>
    <div class="row">
      <div class="col-md-3">
        <h1>User Profile</h1>
        <form @submit.prevent="submitHandler">
          <div class="form-group my-2">
            <label for="name" class="form-label">Name:</label>
            <input
              placeholder="Enter name"
              v-model="name"
              type="text"
              name="name"
              id="name"
              class="form-control" />
          </div>
          <div class="form-group my-2">
            <label for="email" class="form-label">Email:</label>
            <input
              placeholder="Enter email"
              v-model="email"
              type="email"
              name="email"
              id="email"
              class="form-control" />
          </div>

          <div class="form-group my-2">
            <label for="password" class="form-label">Password:</label>
            <input
              placeholder="Enter password"
              v-model="password"
              type="password"
              name="password"
              id="password"
              class="form-control" />
          </div>
          <div class="form-group my-2">
            <label for="confirmPassword" class="form-label"
              >Confirm Password:</label
            >
            <input
              placeholder="Enter confirmPassword"
              v-model="confirmPassword"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary mt-2 w-100">
            Update
          </button>
        </form>
      </div>
      <div class="col-md-9">
        <h1>Orders</h1>

        <div class="table-responsive">
          <table class="table table-striped responsive">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">DATE</th>
                <th scope="col">TOTAL</th>
                <th scope="col">PAID</th>
                <th scope="col">DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order._id">
                <th scope="row">{{ order._id }}</th>
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
                    <button class="btn btn-sm btn-primary">
                      Details
                    </button></NuxtLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
