import { parse } from "cookie";
import Iron from "@hapi/iron";

import config from "#config";

export default async (req, res) => {
  const { AUTH0_COOKIE_NAME, AUTH0_CLIENT_SECRET } = config;
  const cookies = parse(req.headers.cookie || "");

  if (cookies[AUTH0_COOKIE_NAME] != null) {
    const session = await Iron.unseal(
      cookies[AUTH0_COOKIE_NAME],
      AUTH0_CLIENT_SECRET,
      Iron.defaults
    );
    req.session = session;
  }
};
