import Iron from "@hapi/iron";
import { getCookie } from 'h3'

export default async (req, res) => {
  const { AUTH0_COOKIE_NAME, AUTH0_CLIENT_SECRET } = process.env;
  const cookie = getCookie(req, AUTH0_COOKIE_NAME)

  if (cookie != null) {
    const session = await Iron.unseal(
      cookie,
      AUTH0_CLIENT_SECRET,
      Iron.defaults
    );
    req.session = session;
  }
};
