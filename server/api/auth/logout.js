import config from "#config";

export default async (req, res) => {
  const { AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_COOKIE_NAME } = config;

  res.writeHead(302, {
    "Set-cookie": `${AUTH0_COOKIE_NAME}=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0`,
    Location: `${AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${AUTH0_CLIENT_ID}`,
  });
  res.end();
};
