const title = 'title' || process.env.npm_package_name
const desc = 'desc' || process.env.npm_package_description

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: desc,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // libs files
    '@/assets/css/tailwind.css',
    '@/assets/css/animate.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    // main files
    '@/assets/css/main.css',
    '@/assets/scss/main.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // '@/plugins/_',
    '@/plugins/vue-rx',
    '@/plugins/fa-icon',
    '@/plugins/vuefire',
    '@/plugins/twemoji',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    // :warning: You cannot use path aliases here (~ and @)
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   ** PWA module configuration
   ** See https://pwa.nuxtjs.org/
   */
  pwa: {
    meta: {
      name: title,
      description: desc,
      theme_color: '#000000',
    },
    manifest: {
      name: title,
      short_name: title,
    },
  },

  generate: {
    fallback: true, // ref: https://nuxtjs.org/faq/netlify-deployment/#for-site-generated-in-spa-mode
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // improve build speed (beta)
    cache: true,

    postcss: {
      plugins: {
        'postcss-nested': {},
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      //

      // @see https://github.com/nuxt/nuxt.js/pull/3480#issuecomment-404150387
      if (ctx.isDev) config.output.globalObject = 'this'
    },
  },
}
