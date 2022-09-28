<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, RouterView } from 'vue-router'
import moment from "moment";
const today = computed(() => moment().format("dddd Do MMM"))
</script>

<template>
  <header class="w-full py-6 flex justify-center items-center">
    <div class="wrapper text-center">
      <h1 class="text-xl font-medium mb-4">What did I do today?</h1>
      <h1 class="text-xl font-bold text-blue-900">{{today}}</h1>
    </div>
  </header>
  <main class="w-full flex justify-center items-start p-6 min-h-[50vh] bg-gray-50">
    <RouterView />
  </main>

</template>