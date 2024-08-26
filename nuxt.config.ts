export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        { src: 'https://upload-widget.cloudinary.com/global/all.js', defer: true },
      ],
    },
  },

  css: ['~/assets/styles/bootstrap.custom.css', '~/assets/styles/index.css'],

  modules: [
    'nuxt-icon',
    'nuxt-mongoose',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-vercel-analytics',
  ],

  nitro: {
    compressPublicAssets: true,
  },

  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY,
    },
  },

  runtimeConfig: {
    public: {
      imageUrl: process.env.CLOUDINARY,
      cloudinaryName: process.env.CLOUDINARY_NAME,
      cloudinaryFolder: process.env.CLOUDINARY_FOLDER,
      stripePublic: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/product/**': { isr: 3600 },
    '/login': { prerender: true },
    '/register': { prerender: true },
    '/order/**': { ssr: false },
    '/profile': { ssr: false },
    '/admin/**': { ssr: false },
    '/shipping': { ssr: false },
    '/payment': { ssr: false },
    '/placeorder': { ssr: false },
  },

  compatibilityDate: '2024-08-26',
})
