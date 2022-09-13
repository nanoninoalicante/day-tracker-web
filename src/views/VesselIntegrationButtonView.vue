<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useStorage, useLastChanged, useEventListener } from '@vueuse/core'
import CrewPassButton from '../components/CrewPassButton.vue'
import { random } from "lodash";
const demoEmail = () => `christopher+vessel${random(100, 999)}@nanonino.com`;
const popupUrl = import.meta.env.VITE_CP_POPUP_URL_VESSEL || "https://master-dashboard-v1-ojo6h3z4mq-ez.a.run.app/vessellanding";

const inputData: any = useStorage('cp-vessel-button-data', {
	data: {
		"cpPopupUrl": popupUrl,
		"cpPartner": "yotspot",
		"cpUserEmail": demoEmail(),
		"cpUserId": "yotspotuser123",
		"cpFirstName": "Chris",
		"cpLastName": "Hill",
		"cpNationality": "UK",
		"cpDob": "1987-03-29",
		"cpGender": "male",
		"cpCountryCode": "+44",
		"cpPhone": "7411103268",
		"cpStreetAddress": "Calle Poeta Campos Vasallo 30",
		"cpCity": "Alicante",
		"cpState": "Alicante",
		"cpCountry": "Spain"
	}
});
const fullPoupupUrl = ref("");
const lastChanged = useLastChanged(inputData.value)
const inputs = computed(() => {
	let arr = [];
	for (const input in inputData.value.data) {
		arr.push({ key: input, value: inputData.value.data[input] })
	}
	return arr;
})
useEventListener(window, 'message', (message: any) => {
	console.log('message origin: ', message.origin)
	console.log('message: ', message.data)
	if (message.data?.url) {
		fullPoupupUrl.value = message.data?.url;
	}
})
const update = () => {
	window.location.reload();
}
onMounted(() => {

})
</script>

<template>
	<main class="w-full md:w-4/5 flex flex-col justify-center items-center space-y-4">

		<h1 id="title" class="text-lg font-medium">Vessel Integration</h1>
		<div id="cp-holder-1" class="flex justify-center flex-col items-center">
			<button v-if="lastChanged" @click="update"
				class="my-0 py-2 px-4 rounded-xl bg-yellow-400 hover:bg-gray-400 text-xl font-medium">Changed -
				Update</button>
			<CrewPassButton v-else :input-data="inputData"></CrewPassButton>
			<div class="flex mt-4">
				<p>Url: <span class="text-sm text-gray-500 break-all">{{fullPoupupUrl}}</span></p>
			</div>
			<div class="flex flex-col w-full md:w-[400px] mt-8">
				<div v-for="item in inputs" class="my-1">
					<label class="text-sm italic ml-4 font-medium text-gray-400" for="inputData.data[item.key]">{{
					item.key
					}}</label>
					<input v-model="inputData.data[item.key]" name="inputData.data[item.key]" type="text"
						class="p-2 border-2 border-gray-200 w-full rounded-xl" />
				</div>
			</div>
		</div>

	</main>
</template>
