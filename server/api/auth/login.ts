export default defineEventHandler(async (event) => {
  const { AUTH0_BASE_URL, AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } =
    useRuntimeConfig()

  const loginUrl = `${AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${AUTH0_CLIENT_ID}&redirect_uri=${AUTH0_BASE_URL}/api/auth/callback&scope=openid%20profile%20email&audience=${AUTH0_AUDIENCE}`
  event.node.res.writeHead(302, {
    Location: loginUrl
  })
  event.node.res.end()
})
