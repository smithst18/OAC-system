<script setup lang="ts">
  import { defineAsyncComponent, onMounted, onUnmounted, computed } from "vue";
  import { useCaseStore } from "../store/caseStore";
  import { useToast } from "@/composables/useToast";
  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const Doughnut = defineAsyncComponent(() => import("@/components/charts/DoughnutChart.vue"));
  const BarChart = defineAsyncComponent(() => import("@/components/charts/barChart.vue"));
  const UserBar = defineAsyncComponent(() => import("@/components/commons/UserBar.vue"));
  // const Button = defineAsyncComponent(() => import("@/components/commons/MainButton.vue"));

  const caseStore = useCaseStore();
  const toast = useToast();
  const fecha = computed(() => new Date().toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit'}));

  // const printHtml = () => {
  //   console.log("hola")
  // }

  onMounted( async () => {
    const resp = await caseStore.setGeneralStatistics();
    if(resp == "200"){
      toast.successToast("Estadisticas cargadas");
    }else if(resp == "403") toast.errorToast("Error cargando data")
    else toast.errorToast("Server ERROR");
  });
//as NumericArrayProp
  onUnmounted(() => {
    caseStore.$reset()
  });
</script>

<template>
    <div class="w-full h-full">
      <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
        <InfoBar class="text-gray-400"/>
      </div>
      <UserBar/>

      <div class=" w-full h-[30%] flex justify-around items-center border bg-white shadow-md  rounded-2xl px-5 py-5">

        <div class="w-[40%] h-full mr-10">
          <Doughnut title="Cantidad de casos por categoria" :data="caseStore.getquantityPerCategory.counts" :labels="caseStore.getquantityPerCategory.labels" v-if="caseStore.getquantityPerCategory.counts.length > 0"/>
          <p v-else class="text-center"> Estadisticas Insuficientes ...</p>
        </div>

        <div class="w-[40%] h-full py-1 text-gray-500 text-sm flex items-center flex-col text-justify">
          <p>
            Las siguientes gráficas entregan valores al dia mes y año  {{ fecha }}.
            <span>Entregando un total de : <span class="font-bold text-green-500" v-if="caseStore.getTotalCases >= 0">{{ caseStore.getTotalCases }}</span>  casos totales, a la fecha en curso del dia de hoy.</span>
          </p>

          <!-- <Button
            title="Imprimir Grafica" 
            icon="download" :full-size="false"
            class="flex items-center justify-center !w-48 h-8 mt-8 !text-primary opacity-75 text-center  cursor-pointer rounded-md bg-transparent bg-opacity-80 hover:bg-transparent hover:opacity-50 !text-base focus:ring-0"
            @click="printHtml"/> -->
        </div>

      </div>

      <div class="w-full mt-10 mb-10 h-[40%] grid grid-cols-3 gap-20">
        <div class="bg-white rounded-2xl shadow-md py-5 px-5"> 
          <BarChart title="Casos Cerrados" :labels="caseStore.getClosedCasesChart.labels" :data="caseStore.getClosedCasesChart.counts" v-if="caseStore.getClosedCasesChart.counts.length > 0"/>
          <p v-else class="text-center"> Estadisticas Insuficientes ...</p>
        </div>

        <div class="bg-white rounded-2xl shadow-md py-5 px-5"> 
          <BarChart title="Casos Abiertos" :labels="caseStore.getOpenCasesChart.labels" :data="caseStore.getOpenCasesChart.counts" v-if="caseStore.getOpenCasesChart.counts.length > 0"/>
          <p v-else class="text-center"> Estadisticas Insuficientes ...</p>
        </div>

        <div class="bg-white rounded-2xl shadow-md py-5 px-5"> 
          <BarChart title="Casos En Proceso" :labels="caseStore.getOnProcessCasesChart.labels" :data="caseStore.getOnProcessCasesChart.counts" v-if="caseStore.getOnProcessCasesChart.counts.length > 0"/>
          <p v-else class="text-center"> Estadisticas Insuficientes ...</p>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>
