import type { User } from '~/server/utils/api'

export function useReadUsers(){

  const data = {
    users: ref<User[]>([]),
    page: ref(1),
    pageSize: ref(6),
    total: ref(0),
    totalPages: ref(0),
    isLoading: ref(true),
  }

  async function loadUsers(){
    data.isLoading.value = true;

    const response = await $fetch('/api/users', {
      method: 'GET',
      query: {
        page: data.page.value,
        pageSize: data.pageSize.value,
      }
    })
    const hasData = "data" in response;

    if (hasData) {
      data.users.value = response.data.users;
      data.page.value = response.data.page;
      data.pageSize.value = response.data.pageSize;
      data.total.value = response.data.total;
      data.totalPages.value = response.data.totalPages;
    }

    // wait extra 400 ms to show the loading spinner
    await new Promise((resolve) => setTimeout(resolve, 400));
    data.isLoading.value = false;
  }

  async function changePage(page: number){
    data.page.value = page;
    await loadUsers();
  }

  return {
    data,
    loadUsers,
    changePage,
  }
}

export type ReadUsers = ReturnType<typeof useReadUsers>