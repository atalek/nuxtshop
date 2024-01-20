<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()

const userData = useCookie('auth')

authStore.nuxtClientInit(userData.value)

if (process.client) {
  cartStore.nuxtClientInit()
}

useSeoMeta({
  title: 'NuxtShop',
  description:
    'Shop unique finds, explore trending styles, and express your individuality with NuxtShop. ✨',
  image:
    'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
  url: 'https://nuxtshop-yep.vercel.app',

  ogTitle: 'NuxtShop - Shop Your Style, Effortlessly  ✨',
  ogDescription:
    'Discover a curated collection of unique products that reflect your personality at NuxtShop. ✨',
  ogImage:
    'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
  ogUrl: 'https://nuxtshop-yep.vercel.app',

  twitterTitle:
    'Express Your Individuality with NuxtShop ✨ #ecommerce #fashion #shopping',
  twitterDescription:
    'Shop a curated collection of unique finds that celebrate your style. Explore now! ✨',
  twitterImage:
    'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: { lang: 'en' },
  meta: [{ name: 'description', content: 'eCommerce website example' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} | NuxtShop` : 'NuxtShop'
  },
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
