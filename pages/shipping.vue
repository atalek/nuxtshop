<script lang="ts" setup>
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { ShippingAddress } from '~/types'

const cartStore = useCartStore()
const authStore = useAuthStore()

const shippingAddress = cartStore.shippingAddress as ShippingAddress

const address = ref(shippingAddress.address || '')
const city = ref(shippingAddress.city || '')
const postalCode = ref(shippingAddress.postalCode || '')
const country = ref(shippingAddress.country || '')
const isButtonDisabled = ref(true)

function submitHandler() {
  const shippingInfo = {
    address: address.value,
    city: city.value,
    postalCode: postalCode.value,
    country: country.value,
  }
  cartStore.saveShippingAddress(shippingInfo)
  navigateTo('/payment')
}

watchEffect(() => {
  isButtonDisabled.value = !(
    address.value &&
    city.value &&
    postalCode.value &&
    country.value
  )
  if (authStore.userInfo !== undefined) {
    navigateTo('/login')
  }
})
</script>

<template>
  <div>
    <Title>{{ 'Shipping' }}</Title>

    <FormContainer>
      <CheckoutSteps :step1="true" :step2="true" />
      <h1>Shipping</h1>
      <form @submit.prevent="submitHandler">
        <div class="form-group my-2">
          <label for="address" class="form-label">Address:</label>
          <input
            placeholder="Enter address"
            v-model="address"
            type="text"
            name="address"
            id="address"
            class="form-control" />
        </div>
        <div class="form-group my-2">
          <label for="city" class="form-label">City:</label>
          <input
            placeholder="Enter city"
            v-model="city"
            type="text"
            name="city"
            id="city"
            class="form-control" />
        </div>
        <div class="form-group my-2">
          <label for="postalCode" class="form-label">Postal Code:</label>
          <input
            placeholder="Enter postalCode"
            v-model="postalCode"
            type="text"
            name="postalCode"
            id="postalCode"
            class="form-control" />
        </div>
        <div class="form-group my-2">
          <label for="country" class="form-label">Country:</label>
          <input
            placeholder="Enter country"
            v-model="country"
            type="text"
            name="country"
            id="country"
            class="form-control" />
        </div>
        <button
          type="submit"
          class="btn btn-primary mt-2 w-100"
          :disabled="isButtonDisabled">
          Continue
        </button>
      </form>
    </FormContainer>
  </div>
</template>
