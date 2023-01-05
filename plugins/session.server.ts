export default defineNuxtPlugin((nuxt) => {
  //const session = nuxt.ssrContext?.event.context.session
  const event = useRequestEvent(nuxt)
  const { session } = event.context
  if (session && session.user) {
    useState('user', () => session.user || null)
  }
})
