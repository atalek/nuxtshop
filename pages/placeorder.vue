<script lang="ts" setup>
import { useOrderStore } from '~/stores/order'
import { useCartStore } from '~/stores/cart'
import formatPrice from '~/utils/formatter'
import { toast } from 'vue3-toastify'
import { ShippingAddress } from '~/types'

const cartStore = useCartStore()
const orderStore = useOrderStore()
const shippingAddress = computed(
  () => cartStore.shippingAddress as ShippingAddress
)

async function placeOrderHandler() {
  try {
    const order = {
      orderItems: cartStore.items,
      shippingAddress: cartStore.shippingAddress as ShippingAddress,
      paymentMethod: cartStore.paymentMethod,
      itemsPrice: cartStore.subTotal,
      shippingPrice: cartStore.shippingPrice,
      taxPrice: cartStore.taxTotal,
      totalPrice: cartStore.total,
    }
    await orderStore.placeOrder(order)
    cartStore.clearCart()
  } catch (error: any) {
    toast.error(error.message)
  }
}
</script>

<template>
  <Title>{{ 'Place Order' }}</Title>

  <div class="row">
    <CheckoutSteps
      class="mt-4"
      :step1="true"
      :step2="true"
      :step3="true"
      :step4="true"
    />
    <div class="col-md-8">
      <div class="list-group list-group-flush">
        <div class="list-group-item">
          <h2>Shipping</h2>
          <p>
            <strong>Address:</strong>
            {{ shippingAddress.address }} , {{ shippingAddress.city }} ,
            {{ shippingAddress.postalCode }}
            {{ shippingAddress.country }}
          </p>
        </div>
        <div class="list-group-item">
          <h2>Payment Method</h2>
          <strong>Method: </strong>
          {{ cartStore.paymentMethod }}
        </div>
        <div class="list-group-item">
          <h2>Order Items</h2>
        </div>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="cartStore.items.length === 0"
        >
          Your cart is empty
        </div>

        <div
          class="list-group-item"
          v-for="(item, index) in cartStore.items"
          :key="index"
        >
          <div class="row">
            <div class="col-md-2">
              <NuxtImg
                provider="cloudinary"
                :src="item.product.image"
                :alt="item.product.name"
                class="img-fluid rounded"
              />
            </div>
            <div class="col">
              <NuxtLink :to="`/product/${item.product}`">{{
                item.product.name
              }}</NuxtLink>
            </div>
            <div class="col-md-4">
              {{ item.qty }} x {{ item.product.price }} = ${{
                item.qty * item.product.price
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="list-group list-group flush">
          <div class="list-group-item">
            <h2>Order Summary</h2>
          </div>
          <div class="list-group-item">
            <div class="row">
              <div class="col">Items</div>
              <div class="col">{{ formatPrice(cartStore.subTotal) }}</div>
            </div>
          </div>
          <div class="list-group-item">
            <div class="row">
              <div class="col">Shipping</div>
              <div class="col">
                {{
                  cartStore.shippingPrice === 0
                    ? 'Free'
                    : formatPrice(cartStore.shippingPrice)
                }}
              </div>
            </div>
          </div>
          <div class="list-group-item">
            <div class="row">
              <div class="col">Tax</div>
              <div class="col">{{ formatPrice(cartStore.taxTotal) }}</div>
            </div>
          </div>
          <div class="list-group-item">
            <div class="row">
              <div class="col">Total</div>
              <div class="col">{{ formatPrice(cartStore.total) }}</div>
            </div>
          </div>
          <div class="list-group-item">
            <button
              class="btn btn-primary btn-block w-100 w-sm-100"
              @click="placeOrderHandler"
              :disabled="cartStore.totalCount === 0"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
