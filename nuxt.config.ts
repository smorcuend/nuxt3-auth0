import { defineNuxtConfig } from "nuxt";

const {
  AUTH0_SECRET,
  AUTH0_BASE_URL,
  AUTH0_ISSUER_BASE_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_COOKIE_NAME,
} = process.env;

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    AUTH0_SECRET,
    AUTH0_BASE_URL: AUTH0_BASE_URL || process.env.URL,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE,
    AUTH0_COOKIE_NAME,
  },
  build: {
    transpile: [
      'primevue'
    ],
  },
  // css
  css: [
    "primevue/resources/themes/lara-light-teal/theme.css",
    "primevue/resources/primevue.css",
    "primeflex/primeflex.css",
    "primeicons/primeicons.css",
  ],
});
