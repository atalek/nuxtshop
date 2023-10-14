// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        { src: 'https://upload-widget.cloudinary.com/global/all.js' },
        { src: 'https://js.stripe.com/v3/', defer: true },
      ],
    },
  },

  css: ['~/assets/styles/bootstrap.custom.css', '~/assets/styles/index.css'],

  modules: ['nuxt-icon', 'nuxt-mongoose', '@pinia/nuxt', '@nuxt/image'],

  nitro: {
    compressPublicAssets: true,
  },

  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY,
    },
  },
  runtimeConfig: {
    public: {
      cloudinaryName: process.env.CLOUDINARY_NAME,
      cloudinaryFolder: process.env.CLOUDINARY_FOLDER,
      stripePublic: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  routeRules: {
    '/order/**': { ssr: false },
    '/profile': { ssr: false },
    '/admin/**': { ssr: false },
    '/shipping': { ssr: false },
    '/payment': { ssr: false },
    '/placeorder': { ssr: false },
  },
})
