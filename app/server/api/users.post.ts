
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

  const body = await readBody(event)
  return await useApi(jwt).users.create({
    email: body.email,
    name: body.name,
  })
})