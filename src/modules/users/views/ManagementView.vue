<script setup lang='ts'>
  import { defineAsyncComponent } from 'vue';
  import { useRouter } from 'vue-router';

  const ManagementTable = defineAsyncComponent(() => import("@/modules/users/components/ManagementTable.vue"));
  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
      <InfoBar class="text-gray-400"/>
    </div>
    <h1 class="text-3xl text-white uppercase my-10">Hola, Keyla Goncalves</h1>
    <div class="bg-white text-primary-light shadow-md  rounded-2xl w-full h-[80%] py-5 px-5">
      <ManagementTable/>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>