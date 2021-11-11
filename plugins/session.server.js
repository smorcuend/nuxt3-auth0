import { defineNuxtPlugin, useState } from "#app";

export default defineNuxtPlugin((nuxt) => {
  const session = nuxt.ssrContext.req.session;

  if (session && session.user) {
    useState("user", () => session.user);
  }
});
