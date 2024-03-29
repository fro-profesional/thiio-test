import type { User } from '~/server/utils/api'
import type { ReadUsers } from "./use-read-users"

export function useDeleteUser({
  user,
  readUsers,
}: {
  user: User
  readUsers: ReadUsers
}) {

  async function deleteUser() {
    const response = await $fetch('/api/users', {
      method: 'DELETE',
      body: JSON.stringify({
        email: user.email,
      }),
    });

    await readUsers.loadUsers();
  }

  return {
    deleteUser,
  }
}