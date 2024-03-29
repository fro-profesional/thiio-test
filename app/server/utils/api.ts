
export type User = {
  id: number,
  name?: string,
  email: string,
  last_login_at?: string,
  created_at: string,
  updated_at?: string,
}

type ApiResponse<T = unknown> = {
  message?: string,
  errors?: Record<string, string[]>,
} & T


export function useApi(jwt: string) {
  const config = useRuntimeConfig()
  const apiHost = config.public.apiHost
  const headers = new Headers({
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  })
  const baseUrl = new URL(apiHost)

  async function user(): Promise<ApiResponse<{
    user: User
  }>> {
    const url = new URL("/api/user", baseUrl)
    const response = await fetch(url.toString(), { headers, method: "GET" })
    return {
      user: await response.json()
    }
  }

  async function logout() {
    const url = new URL("/api/logout", baseUrl)
    await fetch(url.toString(), { headers, method: "GET" })
  }

  async function createUser(data: {
    email: string,
    name?: string,
  }): Promise<ApiResponse<{
    user: User
  }>> {
    const url = new URL("/api/users", baseUrl)
    const response = await fetch(url.toString(), { headers, method: "POST", body: JSON.stringify(data) })
    return await response.json()
  }

  async function updateUser(data: {
    email: string,
    name?: string,
  }): Promise<ApiResponse<{
    user: User
  }>> {
    const url = new URL("/api/users", baseUrl)
    const response = await fetch(url.toString(), { headers, method: "PATCH", body: JSON.stringify(data) })
    return await response.json()
  }

  async function deleteUser(data: {
    email: string,
  }) {
    const url = new URL("/api/users", baseUrl)
    await fetch(url.toString(), { headers, method: "DELETE", body: JSON.stringify(data) })
  }

  async function readUsers(data?: {
    page?: number,
    pageSize?: number,
  }): Promise<ApiResponse<{
    data: {
      users: User[]
      page: number
      pageSize: number
      total: number
      totalPages: number
    }
  }>> {
    const url = new URL("/api/users", baseUrl)
    if (data?.page) url.searchParams.set("page", data.page.toString())
    if (data?.pageSize) url.searchParams.set("pageSize", data.pageSize.toString())
    const response = await fetch(url.toString(), { headers, method: "GET" })
    return await response.json()
  }

  return {
    user,
    logout,
    users: {
      create: createUser,
      read: readUsers,
      update: updateUser,
      delete: deleteUser,
    }
  }
}