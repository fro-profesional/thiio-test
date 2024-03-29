
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

  return await useApi(jwt).user()
})