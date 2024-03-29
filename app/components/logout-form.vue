<script setup lang="ts">
const userStore = useUserStore()
const user = userStore.user
const userName = user?.name ?? user?.email
</script>

<template>
  <div class="w-full md:flex md:justify-between p-2 md:p-4">
    <span class="block font-semibold text-center md:text-left">{{ userName }} (you)</span>
    <div class="grid items-center"><v-btn color="primary" @click="userStore.logout">Logout</v-btn></div>
  </div>
</template>
