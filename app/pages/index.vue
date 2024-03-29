<script setup lang="ts">

const userStore = useUserStore()
const userManagementStore = useUserManagementStore();

onMounted(async () => {
  await userStore.onMounted()

  if (userStore.isAuth) {
    await userManagementStore.readUsers.loadUsers()
  }
})
</script>


<template>
  <div class="w-full min-h-screen">
    <AuthForm v-if="!userStore.isAuth" />
    <div v-else class="w-full mb-20">
      <LogoutForm />

      <h1 class="text-center text-2xl font-bold mb-4">User Management System</h1>

      <div class="w-full mb-10">
        <CreateUserForm />
      </div>

      <div class="flex w-full justify-between px-4">
        <h2 class="text-lg font-semibold mb-10">Users in the system</h2>
        <v-btn @click="userManagementStore.readUsers.loadUsers">
          Reload
        </v-btn>
      </div>

      <div class="w-full px-4">
        <v-alert type="info" dense>
          <span v-if="userManagementStore.readUsers.data.isLoading">
            Loading users...
          </span>
          <span v-else class="w-full block">
            <span class="flex justify-between">
              <span>
                {{ userManagementStore.readUsers.data.total }} total users found <br/>
                {{ userManagementStore.readUsers.data.users.length }} users in this page
              </span>
              <span>
                {{ userManagementStore.readUsers.data.page }} / {{ userManagementStore.readUsers.data.totalPages }}
                {{ userManagementStore.readUsers.data.page > 1 ? 'page' : 'pages'}}
             </span>
            </span>
          </span>
        </v-alert>
  
      </div>
      <div class="grid grid-cols-3 gap-4">
        <UserCard v-for="user in userManagementStore.readUsers.data.users" :key="user.id" :user="user" />
      </div>

      <v-pagination
        v-model="userManagementStore.readUsers.data.page"
        :length="userManagementStore.readUsers.data.totalPages"
        rounded="circle"
        @update:model-value="userManagementStore.readUsers.changePage"
      />
    </div>
  </div>
</template>
