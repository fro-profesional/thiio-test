import { useApi } from "~/server/utils/api"

export default defineNuxtRouteMiddleware(async (to, from) => {

  // Check if jwt is in the query
  let jwt = to.query.jwt as string | undefined;
  const jwtCookie = useCookie("jwt", {
    httpOnly: true,
    sameSite: true,
  })

  if (jwt) jwtCookie.value = jwt
  else console.warn('No jwt in query')

  if (jwtCookie.value) {
    // Try to fetch user
    const response = await useApi(jwtCookie.value).user()
    const hasUser = "user" in response

    if (hasUser) {
      // Set user in cookies
      const userCookie = useCookie("user", {
        sameSite: true,
      })
      userCookie.value = JSON.stringify(response.user)
      console.log('User set in cookies')
    }
    else console.warn('No user in response')
  }
  else return console.warn('No jwt in cookie')

})
