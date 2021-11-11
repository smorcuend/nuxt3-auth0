import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxt) => {
  nuxt.$router.beforeEach((to, from, next) => {
    // console.log(to.path, from.path, auth.value);
    next();
  });
});
