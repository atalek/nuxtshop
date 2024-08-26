export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-icon',
    'nuxt-mongoose',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-vercel-analytics',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        { src: 'https://upload-widget.cloudinary.com/global/all.js', defer: true },
      ],
    },
  },

  hooks: {
    'build:manifest': manifest => {
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css
      if (css) {
        for (let i = css.length - 1; i >= 0; i--) {
          if (css[i].startsWith('entry')) css.splice(i, 1)
        }
      }
    },
  },

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
