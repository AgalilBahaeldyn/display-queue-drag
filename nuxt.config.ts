// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr:false,
  modules: ['@nuxtjs/tailwindcss', "nuxt-marquee"],
  app: {
    head: {
      link: [
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
        // }
      ],
      script: [
        // {
        //   src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
        //   tagPosition: 'bodyClose'
        // }
      ]
    }
  },
  plugins: [
    '@/plugins/mqtt',
    '@/plugins/Vue3Marquee.client.ts'
  ],
  // css: ['@/assets/main.css']
})