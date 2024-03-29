import { defineStore } from 'pinia'
import type { User } from '~/server/utils/api'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuth = computed(() => !!user.value)

  async function getUserFromCookies(){
    const userCookie = useCookie<User>("user", {
      sameSite: true,
    })

    if (!userCookie.value) return

    const userData = userCookie.value
    user.value = userData
  }

  async function removeJwtFromQuery() {

    // check if jwt is in the query
    const route = useRoute();
    const jwtQuery = route.query.jwt as string | undefined;
    
    if (!jwtQuery) return console.warn('No jwt in query')

    // Redirect to remove jwt
    await navigateTo({
      query: {},
    }, {
      replace: true,
    })

  }

  async function logout() {
    await $fetch("/api/logout")

    // Remove user from cookies
    const userCookie = useCookie("user", {
      sameSite: true,
    })
    userCookie.value = null

    // Remove from store
    user.value = null
  }

  function onMounted(){
    removeJwtFromQuery()
    getUserFromCookies()
  }

  return {
    user,
    isAuth,
    onMounted,
    logout,
  }
})