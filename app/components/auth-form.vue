<script setup lang="ts">
const base = useRuntimeConfig().public.apiHost
</script>
<template>
  <div class="w-full min-h-screen flex">
    <section class="flex flex-col max-w-3xl m-auto space-y-2">
      <h1 class="font-bold text-3xl text-center mb-4"> 
        Welcome to "fro-thiio" <br /> 
        <span class="text-sm">(User Management System)</span> 
      </h1>
      <h2 class="font-semibold text-center">
        Register or login with
      </h2> 
      <a :href="`${base}/oauth/github/redirect`"
        class="block mx-auto bg-gray-800 w-full text-center hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md inline-flex items-center justify-center transition-colors duration-300 ease-in-out">
        GitHub 
      </a> 
      <a :href="`${base}/oauth/google/redirect`"
        class="block mx-auto bg-red-600 w-full text-center hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md inline-flex items-center justify-center transition-colors duration-300 ease-in-out">
        Google 
      </a>
    </section>
  </div>
</template>