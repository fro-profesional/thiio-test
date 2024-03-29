import { defineStore } from 'pinia'
import type { User } from '~/server/utils/api'
import { useReadUsers } from './use-read-users'
import { useCreateUser } from './use-create-user'
import { useUpdateUser as _useUpdateUser } from './use-update-user'
import { useDeleteUser as _useDeleteUser } from "./user-delete-user"

export const useUserManagementStore = defineStore('userManagement', () => {
  const readUsers = useReadUsers()
  const createUser = useCreateUser({ readUsers })
  const useUpdateUser = ({
    user,
  }: {
    user: User
  }) => _useUpdateUser({
    user,
    readUsers,
  })
  const useDeleteUser = ({
    user,
  }: {
    user: User
  }) => _useDeleteUser({
    user,
    readUsers,
  })

  return {
    createUser,
    readUsers,
    useUpdateUser,
    useDeleteUser,
  }
})