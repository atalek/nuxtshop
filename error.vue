<script setup>
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
      <p class="fs-3">
        <span class="text-danger">Oops!</span> something went wrong.
      </p>
      <p class="lead">The page you're looking for does not exist.</p>

      <NuxtLink @click="handleError" class="btn btn-light my-3"
        >Go Back Home</NuxtLink
      >
    </div>
  </div>
</template>
