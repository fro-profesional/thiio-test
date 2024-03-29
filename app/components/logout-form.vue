<script setup lang="ts">
const userStore = useUserStore()
const user = userStore.user
const userName = user?.name ?? user?.email
</script>

<template>
  <div class="w-full flex justify-between p-4">
    <span class="font-semibold">{{ userName }} (you)</span>
    <v-btn color="primary"  @click="userStore.logout">Logout</v-btn>
  </div>
</template>
