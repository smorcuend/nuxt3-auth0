import * as Iron from '@hapi/iron'
import { createRemoteJWKSet, jwtVerify } from 'jose'

export default defineEventHandler(async (event) => {
  const {
    AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_COOKIE_NAME
  } = useRuntimeConfig()

  try {
    const query = getQuery(event)
    if (query?.error || !query.code) {
      throw new Error(String(query.message))
    }

    const body = JSON.stringify({
      grant_type: 'authorization_code',
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      code: query.code,
      redirect_uri: `${AUTH0_BASE_URL}/api/auth/callback`
    }).toString()

    const data = await fetch(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body
    })
    const { access_token, id_token, scope, expires_in, token_type } = await data.json()

    const JWKS = createRemoteJWKSet(new URL(`${AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`))
    const { payload: user } = await jwtVerify(id_token, JWKS, {
      issuer: `${AUTH0_ISSUER_BASE_URL}/`
    })

    const cookie = {
      user,
      id_token,
      access_token,
      scope,
      expires_in,
      token_type
    }

    const date = new Date()
    date.setDate(date.getDate() + 1)

    const sealedCookie = await Iron.seal(cookie, AUTH0_CLIENT_SECRET, Iron.defaults)

    setCookie(event, AUTH0_COOKIE_NAME, sealedCookie, {
      path: '/',
      secure: true,
      sameSite: 'lax',
      expires: date
    })

    event.node.res
      .writeHead(302, {
        Location: '/'
      })
      .end()
  } catch (error) {
    event.node.res.errored
  }
})
