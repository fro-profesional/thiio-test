<script setup lang="ts">
import type { User } from '~/server/utils/api';

const userStore = useUserStore()
const currentUser = userStore.user
const userManagementStore = useUserManagementStore();
const props = defineProps<{
  user: User
}>()

const updateUser = userManagementStore.useUpdateUser({
  user: props.user
})
const {
  deleteUser
} = userManagementStore.useDeleteUser({
  user: props.user
})

const isSameUser = computed(() => currentUser?.email === props.user.email)
</script>

<template>
  <div class="p-3 rounded-md border-1 border-black">
    <v-sheet class="mx-auto rounded-md" width="300">
      <v-form @submit.prevent="updateUser.submit">
        <v-text-field 
          disabled
          v-model="updateUser.data.email.value" 
          :rules="updateUser.rules.email" label="Email" type="email" />
        <v-text-field 
          v-model="updateUser.data.name.value" 
          :rules="updateUser.rules.name" label="User name" />
        <v-btn class="mt-2" type="submit" block>
          Update
        </v-btn>
        <v-btn v-if="!isSameUser" @click="deleteUser" class="mt-2" type="button" color="primary" block>
          Remove
        </v-btn>
        <v-alert v-if="updateUser.errorMessages.value.length" type="error" dense>
          <ul>
            <li v-for="message in updateUser.errorMessages.value" :key="message">{{ message }}</li>
          </ul>
        </v-alert>
      </v-form>
      
    </v-sheet>
  </div>
</template>