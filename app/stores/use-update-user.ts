import { z } from 'zod';
import type { User } from '~/server/utils/api'
import type { ReadUsers } from "./use-read-users"

export function useUpdateUser({
  user,
  readUsers,
}: {
  user: User
  readUsers: ReadUsers
}) {

  const errorMessages = ref<string[]>([]);
  const data = {
    email: ref(user.email),
    name: ref(user.name ?? ''),
  }
  const schemas = {
    email: z.string().email({ message: 'Invalid email address.' }),
    name: z.string()
      .max(255, { message: 'Name must not exceed 255 characters.' })
      .optional(),
  }
  const rules = {
    name: [
      (value: string) => {
        const result = schemas.name.safeParse(value);
        if (result.success) return true;
        return result.error.errors.at(0)?.message ?? 'Invalid name';
      },
    ],
    email: [
      (value: string) => {
        const result = schemas.name.safeParse(value);
        if (result.success) return true;
        return result.error.errors.at(0)?.message ?? 'Invalid email';
      },
    ],
  }

  async function submit() {
    const submitData: {
      name?: string;
      email: string;
    } = {
      email: data.email.value,
    }

    if (data.name.value) {
      submitData.name = data.name.value;
    }

    const response = await $fetch('/api/users', {
      method: 'PATCH',
      body: JSON.stringify(submitData),
    });

    const hasErrors = "errors" in response;
    const hasUser = "user" in response;

    if (hasErrors) {
      const newErrors = []
      if (response.message) newErrors.push(response.message);
      newErrors.push(...Object.values(response.errors!).flat());
      errorMessages.value = newErrors
    }

    if (hasUser) {
      errorMessages.value = []
      await readUsers.loadUsers()
      data.name.value = response.user.name ?? '';
    }
  }

  return {
    errorMessages,
    data,
    schemas,
    rules,
    submit,
  }

}
