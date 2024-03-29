// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "deno-deploy"
  },
  runtimeConfig: {
    public: {
      apiHost: "https://fhab28ujil.execute-api.us-east-1.amazonaws.com",
    }
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    "@nuxt/test-utils"
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  devtools: { enabled: false }
})
