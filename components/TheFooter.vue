<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col text-center py-3">
          <p>NuxtShop &copy; {{ currentYear }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>
