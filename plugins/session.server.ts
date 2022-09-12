import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxt) => {
  const session = nuxt.ssrContext.event.context?.session;
  if (session && session.user) {
    useState("user", () => session.user);
  }
});
