<script setup lang="ts">
  import type { FilterI } from "@/interfaces/filterInterface";
  import { defineAsyncComponent } from 'vue';
  const InfoBar = defineAsyncComponent(() =>import('@/components/commons/InfoBar.vue'));
  const ReportBar = defineAsyncComponent(() =>import('@/modules/cases/components/ReportBar.vue'));
  const ReportCard = defineAsyncComponent(() => import("@/modules/cases/components/ReportCard.vue"));

  const handleFilter = (e:FilterI) => {
    console.log(e);
  }
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-third shadow-md rounded-2xl w-full h-[8%]">
      <InfoBar class="text-gray-400"/>
    </div>
    <h1 class="text-3xl text-third uppercase my-10">
      Generar Reportes
    </h1>
    <div class="mt-8 h-[80%]">
      <ReportBar class="h-[18%]" @send-filter="handleFilter"/>
      <ReportCard class="w-ful h-[75%]"/>
    </div>

  </div>
</template>
 
<style scoped lang="scss">

</style>