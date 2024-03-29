import { z } from 'zod';
import type { ReadUsers } from "./use-read-users"

export function useCreateUser({
  readUsers
}: {
  readUsers: ReadUsers
}) {
  const errorMessages = ref<string[]>([]);
  const data = {
    email: ref(''),
    name: ref(''),
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
      method: 'POST',
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

      data.email.value = ''
      data.name.value = ''
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
