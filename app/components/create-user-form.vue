<script setup lang="ts">
const userManagementStore = useUserManagementStore();
</script>

<template>
  <div class="w-full flex justify-between p-4">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="userManagementStore.createUser.submit">
        <v-text-field 
          v-model="userManagementStore.createUser.data.email" 
          :rules="userManagementStore.createUser.rules.email" label="Email" type="email" />
        <v-text-field 
          v-model="userManagementStore.createUser.data.name" 
          :rules="userManagementStore.createUser.rules.name" label="User name" />
        <v-btn class="mt-2" type="submit" block>
          Create
        </v-btn>
        <v-alert v-if="userManagementStore.createUser.errorMessages.length" type="error" dense>
          <ul>
            <li v-for="message in userManagementStore.createUser.errorMessages" :key="message">{{ message }}</li>
          </ul>
        </v-alert>
      </v-form>
    </v-sheet>
  </div>
</template>