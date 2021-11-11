import { parse } from 'node:url'
import * as Iron from '@hapi/iron'

// import { createRemoteJWKSet, jwtVerify } from 'jose'
import * as jose from 'jose'

export default async (req, res) => {
  const {
    AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_COOKIE_NAME,
  } = process.env;

  const query = parse(req.url, true).query

  if (query?.error || !query.code) {
    throw new Error(String(query.message))
  }
  const body = JSON.stringify({
    grant_type: "authorization_code",
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    code: query.code,
    redirect_uri: `${AUTH0_BASE_URL}/api/auth/callback`,
  }).toString()

  const data = await fetch(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body
  });

  const { access_token, id_token, scope, expires_in, token_type } =
    await data.json();

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`)
  );

  const { payload: user } = await jose.jwtVerify(id_token, JWKS, {
    issuer: `${AUTH0_ISSUER_BASE_URL}/`,
  });

  const cookie = {
    user,
    id_token,
    access_token,
    scope,
    expires_in,
    token_type,
  };

  const sealedCookie = await Iron.seal(
    cookie,
    AUTH0_CLIENT_SECRET,
    Iron.defaults
  );

  const date = new Date();
  date.setDate(date.getDate() + 1);

  res.writeHead(302, {
    "Set-cookie": `${AUTH0_COOKIE_NAME}=${sealedCookie}; Path=/; Secure; SameSite=Lax; Expires=${date.toUTCString()}`,
    Location: "/",
  });
  res.end();
};
