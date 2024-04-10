<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

if (process.client) {
  cartStore.loadCart()
}

useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} | NuxtShop` : 'NuxtShop'
  },
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    {
      name: 'description',
      content:
        'Shop unique finds, explore trending styles, and express your individuality with NuxtShop. ✨',
    },
    {
      name: 'keywords',
      content:
        'Electronics, Gadgets, Tech, Devices, Appliances, Online Store, Shop, Buy Electronics, Electronics Store, Electronic Products',
    },
    { name: 'author', content: 'Aleksandar Atanasovski' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://nuxtshop.atalek.com' },
    {
      property: 'og:title',
      content: 'NuxtShop - Shop Your Style, Effortlessly  ✨',
    },
    {
      property: 'og:description',
      content:
        'Shop unique finds, explore trending styles, and express your individuality with NuxtShop. ✨',
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    { property: 'twitter:url', content: 'https://nuxtshop.atalek.com' },
    {
      property: 'twitter:title',
      content: 'NuxtShop - Shop Your Style, Effortlessly  ✨',
    },
    {
      property: 'twitter:description',
      content:
        'Shop unique finds, explore trending styles, and express your individuality with NuxtShop. ✨',
    },
    {
      property: 'twitter:image',
      content:
        'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
    },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout name="default">
      <div>
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
