<script setup lang="ts">
import { ref } from "vue";
const chucknorris = ref();
const getQuotes = async () => {
  const res = await fetch("https://devproxy.staracademyapp.com/_testing-chucknorris", { mode: 'cors', method: "post" });
  chucknorris.value = await res.json();
}
const getQuotesCors = async () => {
  const res = await fetch("https://devproxy.staracademyapp.com/_testing-cors-plugin", { mode: 'cors', method: "post" });
  chucknorris.value = await res.json();
}
</script>

<template>
  <main class="w-4/5 flex flex-col justify-center items-center space-y-4">
    <h1 class="text-lg font-medium">Vessel Integration</h1>
    <button @click="getQuotesCors" class="p-4 bg-gray-100 rounded-lg hover:bg-gray-300">Get Quotes (with cors)</button>
    <button @click="getQuotes" class="p-4 bg-gray-100 rounded-lg hover:bg-gray-300">Get Quotes</button>
    <p v-if="chucknorris">{{  chucknorris.value  }}</p>
  </main>
</template>
