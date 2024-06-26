<script setup lang="ts">
  import { defineAsyncComponent } from "vue";
  import { type NumericArrayProp } from '@/interfaces/chartInterfaces';
  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const Doughnut = defineAsyncComponent(() => import("@/components/charts/DoughnutChart.vue"));
  const BarChart = defineAsyncComponent(() => import("@/components/charts/barChart.vue"));
</script>

<template>
    <div class="w-full h-full">
      <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
        <InfoBar class="text-gray-400"/>
      </div>
      <h1 class="text-3xl text-white uppercase my-10">Hola, Keyla Goncalves</h1>
      <div class="bg-white shadow-md  rounded-2xl w-full h-[30%] py-5 px-5 flex">
        <div class="w-[30%] h-full mr-5">
          <Doughnut/>
        </div>
        <div class="w-[70%] h-full py-1 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos tempore beatae hic, ducimus ex, ea quas dolore impedit doloribus voluptates, ipsa velit doloremque necessitatibus labore sint nam eveniet ut optio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quidem nulla, adipisci illum debitis labore, at tempore reiciendis dolores laborum iste ea dolor harum mollitia inventore recusandae error, nesciunt tempora.
        </div>
      </div>
      <div class="w-full mt-10 mb-10 h-[40%] grid grid-cols-3 gap-20">
        <div class="bg-white rounded-2xl shadow-md py-5 px-5">
          <BarChart title="Casos Cerrados" :data="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as NumericArrayProp"/>
        </div>
        <div class="bg-white rounded-2xl shadow-md py-5 px-5">
          <BarChart title="Casos Abiertos" :data="[85, 25, 10, 100, 53, 40, 71, 12, 95, 52, 11, 12] as NumericArrayProp"/>
        </div>
        <div class="bg-white rounded-2xl shadow-md py-5 px-5">
          <BarChart title="Casos Pendientes" :data="[12,11,10,9,8,7,6,5,4,3,2,1] as NumericArrayProp"/>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>
