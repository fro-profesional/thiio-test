
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

  const query = getQuery(event)
  return await useApi(jwt).users.read({
    page: query.page as number | undefined,
    pageSize: query.pageSize as number | undefined,
  })
})