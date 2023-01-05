import Iron from '@hapi/iron'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const { AUTH0_COOKIE_NAME, AUTH0_CLIENT_SECRET } = useRuntimeConfig()
  const cookie = getCookie(event, AUTH0_COOKIE_NAME)
  if (!event.context.session) {
    event.context.session = {}
  }

  if (cookie) {
    const { user } = await Iron.unseal(cookie, AUTH0_CLIENT_SECRET, Iron.defaults)
    event.context.session.user = user
  }
})
