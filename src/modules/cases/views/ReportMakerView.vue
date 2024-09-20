<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';
  const InfoBar = defineAsyncComponent(() =>import('@/components/commons/InfoBar.vue'));
  const ReportBar = defineAsyncComponent(() =>import('@/modules/cases/components/ReportBar.vue'));
</script>

<template>
  <div class="w-full h-full border">
    <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
      <InfoBar class="text-gray-400"/>
    </div>
    <h1 class="text-3xl text-white uppercase my-10">
      Generar Reportes
    </h1>
    <div class="border mt-8 h-[80%] bg-white">
      <ReportBar/>
    </div>
  </div>
</template>
 
<style scoped lang="scss">

</style>