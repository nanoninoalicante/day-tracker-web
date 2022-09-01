<script setup lang="ts">
import { ref, computed } from "vue";
const errors: any = ref([]);
const originUrl = computed(() => {
  const url = new URL(window.location.href);
  const origin = url.searchParams.get("origin");
  const originUrl = new URL(origin || "");
  return originUrl.origin
})
const postMessage = () => {
  try {

    const payload = {
      cpUniqueId: "513423262",
      status: "pending",
      email: "christopher+crewemail@nanonino.com",
      firstName: "Chris",
      lastName: "Hill"
    }

    window.opener.postMessage(payload, originUrl.value);
  } catch (error: any) {
    console.log("error from post message: ", error);
    errors.value.push(error.message || "error from post");
  }
}
</script>

<template>
  <main class="w-4/5 flex flex-col justify-center items-center space-y-4">
    <h1 class="text-lg font-medium">Vessel Integration</h1>
    <button @click="postMessage" class="p-4 bg-gray-100 hover:bg-gray-300 rounded-xl">Post Message back to
      origin</button>
      <p class="text-md">Origin: {{originUrl}}</p>
    <div class="text-red-700" v-if="errors && errors.length > 0">
      <h1 class="text-lg font-medium">Errors:</h1>
      <p v-for="error in errors" class="text-md">{{ error }}</p>
    </div>
  </main>
</template>
