<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="w-full p-8 flex justify-center items-center">
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
  <main class="w-full flex justify-center items-center py-8">
    <RouterView />
  </main>

</template>