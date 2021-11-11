import config from "#config";

export default async (req, res) => {
  const data = await fetch(`${config.AUTH0_ISSUER_BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${req.session.access_token}`,
    },
  });
  return await data.json();
};
