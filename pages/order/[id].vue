<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/order'

definePageMeta({
  middleware: 'unauthenticated',
})

const authStore = useAuthStore()
const orderStore = useOrderStore()

const route = useRoute()
const orderId = route.params.id as string

const { data: order, refresh } = await orderStore.fetchSingleOrder(orderId)
const isLoading = ref(false)

async function deliverOrder() {
  if (authStore.userInfo.isAdmin) {
    await orderStore.deliverOrder(orderId)

    toast.success('Order delivered!')
    refresh()
  }
}

async function proceedToCheckout() {
  try {
    isLoading.value = true
    const res = await $fetch('/api/stripe/checkout', {
      method: 'POST',
      body: order?.value,
    })
    if (res) {
      return navigateTo(res, { external: true })
    }
  } catch (error: any) {
    toast.error(error.data.message)
  } finally {
    isLoading.value = false
  }
}

let toastShown = false
watchEffect(() => {
  if (!toastShown) {
    if (route.fullPath.endsWith('success=1')) {
      toast.success('Order paid')
      toastShown = true
    }
    if (route.fullPath.endsWith('canceled=1')) {
      toast.error('Payment failed')
      toastShown = true
    }
  }
})
</script>

<template>
  <div>
    <Title>{{ 'Order' }}</Title>

    <h1>Order {{ order?._id }}</h1>

    <div class="row">
      <div class="col-md-8">
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <h2>Shipping</h2>
            <p><strong>Name: </strong>{{ order?.user.name }}</p>
            <p><strong>Email: </strong>{{ order?.user.email }}</p>
            <p>
              <strong>Address: </strong>{{ order?.shippingAddress.address }},
              {{ order?.shippingAddress.postalCode }}
              {{ order?.shippingAddress.city }},
              {{ order?.shippingAddress.country }}
            </p>
            <p
              class="my-4 alert alert-success"
              role="alert"
              v-if="order?.isDelivered">
              Delivered on {{ order?.deliveredAt.substring(0, 10) }}
            </p>
            <p class="my-4 alert alert-danger" role="alert" v-else>
              Not delivered
            </p>
          </div>
          <div class="list-group-item">
            <h2>Payment Method</h2>
            <p><strong>Method: </strong>{{ order.paymentMethod }}</p>
            <p
              class="my-4 alert alert-success"
              role="alert"
              v-if="order.isPaid">
              Paid on {{ order.paidAt.substring(0, 10) }}
            </p>
            <p class="my-4 alert alert-danger" role="alert" v-else>Not paid</p>
          </div>

          <div class="list-group-item">
            <h2>Order Items</h2>
            <p
              class="my-4 alert alert-danger"
              role="alert"
              v-if="order.orderItems.length === 0">
              Order is empty
            </p>
            <div class="list-group list-group flush">
              <div
                class="list-group-item"
                v-for="(item, index) in order.orderItems"
                :key="index">
                <div class="row">
                  <div class="col-md-2">
                    <NuxtImg
                      provider="cloudinary"
                      :src="item.image"
                      :alt="item.name"
                      class="img-fluid" />
                  </div>
                  <div class="col">
                    <NuxtLink :to="`/product/${item.product}`">{{
                      item.name
                    }}</NuxtLink>
                  </div>
                  <div class="col-md-5">
                    {{ item.qty }} x ${{ item.price }} = ${{
                      item.qty * item.price
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="list-group list-group-flush">
            <div class="list-group-item">
              <h2>Order summary</h2>
            </div>
            <div class="list-group-item">
              <div class="row">
                <div class="col">Items</div>
                <div class="col">${{ order.itemsPrice }}</div>
              </div>
              <div class="row">
                <div class="col">Shipping</div>
                <div class="col">
                  {{
                    order.shippingPrice === 0
                      ? 'Free'
                      : '$' + order.shippingPrice
                  }}
                </div>
              </div>
              <div class="row">
                <div class="col">Tax</div>
                <div class="col">${{ order.taxPrice.toFixed(2) }}</div>
              </div>
              <div class="row">
                <div class="col">Total</div>
                <div class="col">${{ order.totalPrice.toFixed(2) }}</div>
              </div>
            </div>
            <div class="col">
              <div v-show="!order.isPaid">
                <div id="card-element" />
                <button
                  class="btn btn-primary w-100 buttonn"
                  @click="proceedToCheckout">
                  <template v-if="isLoading">
                    <Icon class="text-center" name="svg-spinners:180-ring" />
                  </template>
                  <template v-else> Pay Now </template>
                </button>
              </div>

              <button
                class="btn btn-primary w-100"
                v-show="
                  authStore.userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered
                "
                @click="deliverOrder">
                Mark as delivered
              </button>
            </div>
          </div>
        </div>
        <div class="col mt-5">
          <h5
            class="text-center my-4 alert alert-primary"
            role="alert"
            v-show="!order.isPaid">
            Use card number 4242 4242 4242 4242 to test payment
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
