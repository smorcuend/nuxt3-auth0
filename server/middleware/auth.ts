import { getCookie } from 'h3'
export default defineEventHandler((event) => {
  const { AUTH0_COOKIE_NAME } = useRuntimeConfig()
  const token = getCookie(event, AUTH0_COOKIE_NAME)
  const URL = event.req.url
  if (URL.includes('/api/auth/')) {
    return
  }
  if (URL.includes('/api/')) {
    if (Boolean(token) !== true) {
      event.res.statusCode = 401
      event.res.end('You must be signed in to access to resource.')
    }
  } else {
    // if (Boolean(token) !== true) {
    //   event.res.writeHead(302, {
    //     "Set-cookie": `${AUTH0_COOKIE_NAME}=; Path=/; Secure; SameSite=Lax; Expires=`,
    //     Location: "/login",
    //   });
    //   event.res.end();
    // }
  }
})
