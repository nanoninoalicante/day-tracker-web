<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps(["inputData"]);
const inputData = props.inputData;
</script>
<template>
    <div id="cp-agency-crew-profile-button" :data-cp-partner="inputData.data.cpPartner"
        :data-cp-user-email="inputData.data.cpUserEmail" :data-cp-user-id="inputData.data.cpUserId"
        :data-cp-first-name="inputData.data.cpFirstName" :data-cp-last-name="inputData.data.cpLastName"
        :data-cp-nationality="inputData.data.cpNationality" :data-cp-dob="inputData.data.cpDob"
        :data-cp-gender="inputData.data.cpGender" :data-cp-country-code="inputData.data.cpCountryCode"
        :data-cp-phone="inputData.data.cpPhone" :data-cp-street-address="inputData.data.cpStreetAddress"
        :data-cp-city="inputData.data.cpCity" :data-cp-state="inputData.data.cpState"
        :data-cp-country="inputData.data.cpCountry" :data-cp-popup-url="inputData.data.cpPopupUrl">CP Button
        Loading
    </div>
</template>