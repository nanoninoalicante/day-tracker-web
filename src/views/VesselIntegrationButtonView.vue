<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue';
import { useStorage, useLastChanged, useEventListener } from '@vueuse/core'
const inputData = useStorage('cp-vessel-button-data', {
  data: {
    "cpPopupUrl": "https://master-dashboard-v1-ojo6h3z4mq-ez.a.run.app/vessellanding",
    "cpPartner": "yotspot",
    "cpUserEmail": "cjameshill@gmail.com",
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
const fullPopupUrl = computed(() => {
  const params = new URLSearchParams();
  for (const input in inputData.value.data) {
    if (input === "cpPopupUrl") continue;
    params.append(input, inputData.value.data[input])
  }
  return `${inputData.value.data.cpPopupUrl}?${params.toString()}`;
})
const lastChanged = useLastChanged(inputData.value)
const inputs = computed(() => {
  let arr = [];
  for (const input in inputData.value.data) {
    arr.push({ key: input, value: inputData.value.data[input] })
  }
  return arr;
})
useEventListener(window, 'message', (message:any ) => {
    console.log('message origin: ', message.origin)
    console.log('message: ', message.data)
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
        class="my-4 p-4 rounded-xl bg-yellow-400 hover:bg-gray-400 text-xl font-medium">Changed - Update</button>
      <div id="cp-agency-crew-profile-button" :data-cp-partner="inputData.data.cpPartner"
        :data-cp-user-email="inputData.data.cpUserEmail" :data-cp-user-id="inputData.data.cpUserId"
        :data-cp-first-name="inputData.data.cpFirstName" :data-cp-last-name="inputData.data.cpLastName"
        :data-cp-nationality="inputData.data.cpNationality" :data-cp-dob="inputData.data.cpDob"
        :data-cp-gender="inputData.data.cpGender" :data-cp-country-code="inputData.data.cpCountryCode"
        :data-cp-phone="inputData.data.cpPhone" :data-cp-street-address="inputData.data.cpStreetAddress"
        :data-cp-city="inputData.data.cpCity" :data-cp-state="inputData.data.cpState"
        :data-cp-country="inputData.data.cpCountry" :data-cp-popup-url="inputData.data.cpPopupUrl">CP Button Loading
      </div>
      <div class="flex flex-col w-full md:w-[400px] mt-8">
        <div v-for="item in inputs" class="my-1">
          <label class="text-sm italic ml-4 font-medium text-gray-400" for="inputData.data[item.key]">{{ item.key
          }}</label>
          <input v-model="inputData.data[item.key]" name="inputData.data[item.key]" type="text"
            class="p-2 border-2 border-gray-200 w-full rounded-xl" />
        </div>
      </div>
    </div>

  </main>
</template>
