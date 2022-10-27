import { getCookie } from 'h3'
import Iron from '@hapi/iron'

export default defineEventHandler(async (event) => {
  const { AUTH0_COOKIE_NAME, AUTH0_CLIENT_SECRET } = useRuntimeConfig()
  try {
    const sealed = getCookie(event, AUTH0_COOKIE_NAME)
    if (sealed) {
      const unsealed = await Iron.unseal(sealed, AUTH0_CLIENT_SECRET, Iron.defaults)
      return unsealed.user
    }
  } catch (err) {
    console.log(err.message)
  }
})
