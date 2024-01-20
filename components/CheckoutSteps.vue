<script lang="ts" setup>
defineProps(['step1', 'step2', 'step3', 'step4'])
</script>

<template>
  <nav class="nav justify-content-center mb-4">
    <div class="nav-item">
      <NuxtLink v-if="step1" to="/login" class="nav-link">Sign In</NuxtLink>
      <div v-else class="nav-link disabled">Sign In</div>
    </div>

    <div class="nav-item">
      <NuxtLink v-if="step2" to="/shipping" class="nav-link">Shipping</NuxtLink>
      <div v-else class="nav-link disabled">Shipping</div>
    </div>

    <div class="nav-item">
      <NuxtLink v-if="step3" to="/payment" class="nav-link">Payment</NuxtLink>
      <div v-else class="nav-link disabled">Payment</div>
    </div>

    <div class="nav-item">
      <NuxtLink v-if="step4" to="/placeorder" class="nav-link"
        >Place Order</NuxtLink
      >
      <div v-else class="nav-link disabled">Place Order</div>
    </div>
  </nav>
</template>
