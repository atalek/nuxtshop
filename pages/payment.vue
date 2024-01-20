<script lang="ts" setup>
import { useCartStore } from '~/stores/cart'
definePageMeta({
  middleware: 'unauthenticated',
})

const cartStore = useCartStore()
const paymentMethod = ref('PayPal')

function submitHandler() {
  cartStore.savePaymentMethod(paymentMethod.value)
  navigateTo('/placeorder')
}

watchEffect(() => {
  if (Object.keys(cartStore.shippingAddress).length === 0) {
    navigateTo('/shipping')
  }
})
</script>

<template>
  <FormContainer>
    <Title>{{ 'Payment' }}</Title>
    <CheckoutSteps :step1="true" :step2="true" :step3="true" />
    <h1>Payment Method</h1>
    <form class="form-group" @submit.prevent="submitHandler">
      <legend class="form-label">Select Method</legend>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input my-2"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked="true" />
          <label class="form-check-label" for="flexRadioDefault1">
            PayPal or Credit Card
          </label>
        </div>
      </div>

      <button type="submit" class="btn btn-primary my-2">Continue</button>
    </form>
  </FormContainer>
</template>

<style scoped></style>
