<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()

const user = useUser()

authStore.nuxtClientInit(user.value)

if (process.client) {
  cartStore.nuxtClientInit()
}

// useSeoMeta({
//   title: 'NuxtShop',
//   description:
//     'Shop unique finds, explore trending styles, and express your individuality with NuxtShop. ✨',
//   image:
//     'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
//   url: 'https://nuxtshop-yep.vercel.app',

//   ogTitle: 'NuxtShop - Shop Your Style, Effortlessly  ✨',
//   ogDescription:
//     'Discover a curated collection of unique products that reflect your personality at NuxtShop. ✨',
//   ogImage:
//     'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
//   ogUrl: 'https://nuxtshop-yep.vercel.app',

//   twitterTitle:
//     'Express Your Individuality with NuxtShop ✨ #ecommerce #fashion #shopping',
//   twitterDescription:
//     'Shop a curated collection of unique finds that celebrate your style. Explore now! ✨',
//   twitterImage:
//     'https://res.cloudinary.com/dkofkuquf/image/upload/v1705789464/nuxtshop/qoaeksaivb518wpikvin.webp',
//   twitterCard: 'summary_large_image',
// })

// useHead({
//   htmlAttrs: { lang: 'en' },
//   meta: [
//     {
//       name: 'description',
//       content: 'eCommerce website example',
//     },
//   ],
//   link: [{ rel: 'icon', href: '/favicon.ico' }],
//   titleTemplate: titleChunk => {
//     return titleChunk ? `${titleChunk} | NuxtShop` : 'NuxtShop'
//   },
// })

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
    { property: 'og:url', content: 'https://nuxtshop-yep.vercel.app' },
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
    { property: 'twitter:url', content: 'https://nuxtshop-yep.vercel.app' },
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
