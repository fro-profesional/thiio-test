import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const jwt = cookies.jwt


  if (!jwt) {
    return {
      status: 401,
      body: {
        error: "Unauthorized",
      },
    }
  }
  await useApi(jwt).logout()

  setCookie(event, "jwt", "", {
    httpOnly: true,
    sameSite: true,
    expires: new Date(0), // Set expiration to a past date
  });
})