<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="w-full p-8 flex justify-center items-center">
    <div class="wrapper text-center">
      <h1 class="text-xl font-medium mb-6">CrewPass</h1>
      <nav class="flex space-x-4">
        <a class="p-2 bg-gray-100 rounded-xl hover:bg-gray-300" href="/">Vessel Integration</a>
        <a class="p-2 bg-gray-100 rounded-xl hover:bg-gray-300" href="/crew">Crew Integration</a>
      </nav>
    </div>
  </header>
  <main class="w-full flex justify-center items-start p-6 min-h-[50vh] bg-gray-50">
    <RouterView />
  </main>

</template>