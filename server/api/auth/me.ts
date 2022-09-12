import { getCookie } from 'h3'
import Iron from '@hapi/iron';

const { AUTH0_COOKIE_NAME, AUTH0_CLIENT_SECRET } = process.env

export default defineEventHandler(async (event) => {
  try {
    const sealed = getCookie(event, AUTH0_COOKIE_NAME)
    if (sealed) {
      const unsealed = await Iron.unseal(sealed, AUTH0_CLIENT_SECRET, Iron.defaults);
      return unsealed.user
      
      // console.log(unsealed.access_token)
      // const data = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
      //   headers: {
      //     Authorization: `Bearer ${unsealed.access_token}`,
      //   },
      // });
      // return await data.json();
    }
  } catch (err) {
    console.log(err.message);
  }
})
