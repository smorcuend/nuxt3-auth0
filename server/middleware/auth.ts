import { getCookie } from 'h3'
export default defineEventHandler((event) => {
  const { AUTH0_COOKIE_NAME } = useRuntimeConfig()
  const token = getCookie(event, AUTH0_COOKIE_NAME)
  if (event.node.req.url?.includes('/api/auth/')) {
    return
  }
  if (event.node.req.url?.includes('/api/')) {
    if (Boolean(token) !== true) {
      event.node.res.statusCode = 401
      event.node.res.writeHead(401).end('You must be signed in to access to resource.')
    }
  }
})
