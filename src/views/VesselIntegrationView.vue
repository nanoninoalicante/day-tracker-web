<script setup lang="ts">
import { ref } from "vue";
const postMessage = () => {
  const payload = {
    testing: "hello world"
  }
  window.opener.postMessage(payload, "http://127.0.0.1:5173");
}
</script>

<template>
  <main class="w-4/5 flex flex-col justify-center items-center space-y-4">
    <h1 class="text-lg font-medium">Vessel Integration</h1>
    <button @click="postMessage" class="p-4 bg-gray-100 hover:bg-gray-300 rounded-xl">Message</button>
  </main>
</template>
