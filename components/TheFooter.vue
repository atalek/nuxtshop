<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col text-center py-3">
          <NuxtLink
            to="https://github.com/atalek/nuxtshop"
            target="_blank"
            class="flex align-items-center text-center footer-link"
            >NuxtShop &copy; {{ currentYear }} - Made by atalek
            <Icon name="fa6-brands:github" height="18" width="18"
          /></NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  text-decoration: none;
  font-size: 1.1rem;
}
</style>
