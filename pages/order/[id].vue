<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/order'

let stripe = null
let elements = null
let card = null
let clientSecret = null
let isProcessing = ref(false)
let isCardValid = ref(false)
let paymentIntent = null

const authStore = useAuthStore()
const orderStore = useOrderStore()

const route = useRoute()
const orderId = route.params.id as string

const { data: order, refresh } = await orderStore.fetchSingleOrder(orderId)
const unwrappedOrder = order.value

const totalAmount: number = Math.ceil(unwrappedOrder.totalPrice) * 100

async function payOrder() {
  isProcessing.value = true

  if (!clientSecret) {
    let res = await $fetch('/api/stripe/paymentintent', {
      method: 'POST',
      body: {
        amount: totalAmount,
      },
    })
    clientSecret = res.client_secret
    paymentIntent = res
  }

  let result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card: card },
  })

  if (result.error) {
    toast.error(result.error.data.message)
  } else {
    await orderStore.payOrder(orderId, paymentIntent)

    toast.success('Order paid successfully!')
    refresh()
  }
  isProcessing.value = false
}

async function stripeInit() {
  const config = useRuntimeConfig().public

  stripe = Stripe(config.stripePublic)

  elements = stripe.elements()
  var style = {
    base: {
      fontSize: '18px',
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#EE4B2B',
      iconColor: '#EE4B2B',
    },
  }

  elements = stripe.elements()
  var style = {
    base: {
      fontSize: '16px',
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#EE4B2B',
      iconColor: '#EE4B2B',
    },
  }
  card = elements.create('card', {
    hidePostalCode: true,
    style: style,
  })

  card.mount('#card-element')
  card.on('change', function (event) {
    isCardValid.value = event.complete
  })

  isProcessing.value = false
}

onMounted(() => stripeInit())

async function deliverOrder() {
  if (authStore.userInfo && authStore.userInfo.isAdmin) {
    await orderStore.deliverOrder(orderId)

    toast.success('Order delivered!')
    refresh()
  }
}

watchEffect(() => {
  if (Object.keys(authStore.userInfo).length === 0) {
    navigateTo('/login')
  }
})
</script>

<template>
  <Title>{{ 'Order' }}</Title>

  <h1>Order {{ order._id }}</h1>

  <div class="row">
    <div class="col-md-8">
      <div class="list-group list-group-flush">
        <div class="list-group-item">
          <h2>Shipping</h2>
          <p><strong>Name: </strong>{{ order.user.name }}</p>
          <p><strong>Email: </strong>{{ order.user.email }}</p>
          <p>
            <strong>Address: </strong>{{ order.shippingAddress.address }},
            {{ order.shippingAddress.postalCode }}
            {{ order.shippingAddress.city }},
            {{ order.shippingAddress.country }}
          </p>
          <p
            class="my-4 alert alert-success"
            role="alert"
            v-if="order.isDelivered"
          >
            Delivered on {{ order.deliveredAt.substring(0, 10) }}
          </p>
          <p class="my-4 alert alert-danger" role="alert" v-else>
            Not delivered
          </p>
        </div>
        <div class="list-group-item">
          <h2>Payment Method</h2>
          <p><strong>Method: </strong>{{ order.paymentMethod }}</p>
          <p class="my-4 alert alert-success" role="alert" v-if="order.isPaid">
            Paid on {{ order.paidAt.substring(0, 10) }}
          </p>
          <p class="my-4 alert alert-danger" role="alert" v-else>Not paid</p>
        </div>

        <div class="list-group-item">
          <h2>Order Items</h2>
          <p
            class="my-4 alert alert-danger"
            role="alert"
            v-if="order.orderItems.length === 0"
          >
            Order is empty
          </p>
          <div class="list-group list-group flush">
            <div
              class="list-group-item"
              v-for="(item, index) in order.orderItems"
              :key="index"
            >
              <div class="row">
                <div class="col-md-2">
                  <NuxtImg
                    provider="cloudinary"
                    :src="item.image"
                    :alt="item.name"
                    class="img-fluid"
                  />
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
                  order.shippingPrice === 0 ? 'Free' : '$' + order.shippingPrice
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
              <div id="card-element" class="my-2" />
              <button
                class="btn btn-primary w-100 buttonn"
                :disabled="isProcessing || !isCardValid"
                @click="payOrder"
              >
                <template v-if="isProcessing">
                  <Icon class="text-center" name="svg-spinners:180-ring" />
                </template>
                <template v-else> Pay Now </template>
              </button>
            </div>
            <button
              class="btn btn-primary w-100"
              v-show="
                authStore.userInfo &&
                authStore.userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered
              "
              @click="deliverOrder"
            >
              Mark as delivered
            </button>
          </div>
        </div>
      </div>
      <div class="col mt-5">
        <h5
          class="text-center my-4 alert alert-primary"
          role="alert"
          v-show="!order.isPaid"
        >
          Use card number 4242 4242 4242 4242 to test payment
        </h5>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
