import Iron from "@hapi/iron";
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const { AUTH0_COOKIE_NAME, AUTH0_CLIENT_SECRET } = process.env;
  const cookie = getCookie(event.req, AUTH0_COOKIE_NAME)

  if (cookie != null) {
    const session = await Iron.unseal(
      cookie,
      AUTH0_CLIENT_SECRET,
      Iron.defaults
    );
    event.context.session = session;
  }
});