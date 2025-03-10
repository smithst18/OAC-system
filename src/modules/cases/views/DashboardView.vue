<script setup lang="ts">
  import { defineAsyncComponent, onMounted, onUnmounted, computed } from "vue";
  import { useCaseStore } from "../store/caseStore";
  import { useToast } from "@/composables/useToast";
  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const Doughnut = defineAsyncComponent(() => import("@/components/charts/DoughnutChart.vue"));
  const BarChart = defineAsyncComponent(() => import("@/components/charts/barChart.vue"));
  const UserBar = defineAsyncComponent(() => import("@/components/commons/UserBar.vue"));

  const caseStore = useCaseStore();
  const toast = useToast();
  const fecha = computed(() => new Date().toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit'}));
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
      <div class="bg-cyan-50 border border-cyan-500 shadow-md rounded-2xl w-full h-[8%]">
        <InfoBar class="text-gray-600"/>
      </div>
      <UserBar/>

      <div class=" w-full h-[30%] flex justify-around items-center bg-cyan-50 border border-cyan-500 shadow-md  rounded-2xl p-5">

        <div class="w-[40%] h-full mr-10">
          <Doughnut title="Cantidad de casos por categoria" :data="caseStore.getquantityPerCategory.counts" :labels="caseStore.getquantityPerCategory.labels" v-if="caseStore.getquantityPerCategory.counts.length > 0"/>
          <p v-else class="text-center text-gray-600"> Casos Insuficientes ...</p>
        </div>

        <div class="w-[40%] h-full py-1 text-gray-600 text-sm flex items-center flex-col text-justify">
          <p>
            Las siguientes gráficas entregan valores al dia mes y año  {{ fecha }}.
            <span>Entregando un total de : <span class="font-bold text-green-500" v-if="caseStore.getTotalCases >= 0">{{ caseStore.getTotalCases }}</span>  casos totales, a la fecha en curso del dia de hoy.</span>
          </p>
        </div>

      </div>

      <div class="w-full mt-10 mb-10 h-[40%] grid grid-cols-3 gap-20">
        <div class="bg-cyan-50 border border-cyan-500 rounded-2xl shadow-md py-5 px-5"> 
          <BarChart 
            title="Cerrados" 
            :labels="caseStore.getClosedCasesChart.labels" 
            :data="caseStore.getClosedCasesChart.counts"
            v-if="caseStore.getClosedCasesChart.counts.length > 0"/>
          <p v-else class="text-center text-gray-600"> Casos Cerrados Insuficientes ...</p>
        </div>

        <div class="bg-cyan-50 border border-cyan-500 rounded-2xl shadow-md py-5 px-5"> 
          <BarChart 
            title="Contacto inicial" 
            :labels="caseStore.getOpenCasesChart.labels" 
            :data="caseStore.getOpenCasesChart.counts" 
            v-if="caseStore.getOpenCasesChart.counts.length > 0"/>
          <p v-else class="text-center text-gray-600"> Casos Totales Insuficientes ...</p>
        </div>

        <div class="bg-cyan-50 border border-cyan-500 rounded-2xl shadow-md py-5 px-5"> 
          <BarChart title="En proceso administrativo" :labels="caseStore.getOnProcessCasesChart.labels" :data="caseStore.getOnProcessCasesChart.counts" v-if="caseStore.getOnProcessCasesChart.counts.length > 0"/>
          <p v-else class="text-center text-gray-600"> Casos En Proceso Insuficientes ...</p>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>
