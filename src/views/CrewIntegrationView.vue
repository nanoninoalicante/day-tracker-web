<script setup lang="ts">
function cpLoaded() {
  console.log("cp loaded")
}
</script>

<template>
  <main class="w-4/5 flex flex-col justify-center items-center space-y-4">

    <div id="cp-holder-1">
      <div id="cp-holder-2">
        <div id="cp-agency-crew-profile-button" data-cp-partner="yotspot" data-cp-user-email="cjameshill@gmail.com"
          data-cp-user-id="yotspotuser123" data-cp-first-name="Chris" data-cp-last-name="Hill" data-cp-nationality="UK"
          data-cp-dob="1987-03-29" data-cp-gender="male" data-cp-country-code="+44" data-cp-phone="7411103268"
          data-cp-street-address="Calle Poeta Campos Vasallo 30" data-cp-city="Alicante" data-cp-state="Alicante"
          data-cp-country="Spain">CP Button Loading</div>
      </div>
    </div>
    <h1 id="title" class="text-lg font-medium">Crew Integration</h1>

  </main>
</template>
