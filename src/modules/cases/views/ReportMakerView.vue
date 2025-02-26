<script setup lang="ts">
  import { defineAsyncComponent, onUnmounted } from 'vue';
  import type { FilterI } from "@/interfaces/filterInterface";
  import { useMainStore } from "@/stores/mainStore";
  import {  useCaseStore } from "@/modules/cases/store/caseStore";
  import { useToast } from "@/composables/useToast";
  import { useRouter } from 'vue-router';
  const InfoBar = defineAsyncComponent(() =>import('@/components/commons/InfoBar.vue'));
  const ReportBar = defineAsyncComponent(() =>import('@/modules/cases/components/ReportBar.vue'));
  const ReportCard = defineAsyncComponent(() => import("@/modules/cases/components/ReportCard.vue"));
  const ReportList = defineAsyncComponent(() => import("@/modules/cases/components/ReportList.vue"));
  const router = useRouter();
  const toast = useToast();
  const mainStore = useMainStore();
  const caseStore = useCaseStore();
  
  const titles : Array < string > = [
    "id",
    "cedula",  
    "estatus",
    "entidad",
    "tipo de solicitud",
  ]

  const handleFilter = async (form:FilterI) => {
    const resp = await caseStore.setCaseListReport(form);
    if(resp == '200') toast.successToast("Reporte generado correctamente");
    else if(resp == '404') toast.warnToast("No se han encontrado reportes");
    else if(resp == '500') toast.errorToast("Error al procesar, Error de servidor");
  }
  // const on_picked_element = (elm:string) => {
  //   //open page with all case information + diary book
  //   router.push({name:"update-case", params:{ id:elm }});
  // }

  onUnmounted(() => {
    caseStore.$reset();
  });
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-cyan-50 border border-cyan-500 w-full h-[8%] mb-[2%] rounded-xl bg-red">
      <InfoBar class="text-gray-400"/>
    </div>
    <div class="h-[90%]">
      <ReportBar class="h-[18%] mb-[2%]" @send-filter="handleFilter"/>
      <ReportCard class="h-[77%]" v-if="caseStore.getCaseList.length < 1" msg="Rellenar los Campos de arriba y clickear 'Generar' para ver los reportes"/>
      <div class="h-[77%]" v-else>
        <ReportList
          :data="caseStore.getCaseList"
          class="h-80%"
        />
      </div>
    </div>

  </div>
</template>
 
<style scoped lang="scss">

</style>