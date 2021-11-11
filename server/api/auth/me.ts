export default async (req, res) => {
  const data = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${req.session.access_token}`,
    },
  });
  return await data.json();
};
