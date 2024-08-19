<script setup lang="ts">
  import { defineAsyncComponent, onMounted, onUnmounted } from "vue";
  import { useRouter } from 'vue-router';
  import { useCaseStore } from "@/modules/cases/store/caseStore";
  import { useMainStore } from "@/stores/mainStore";
  import { downloadCasesExcel } from "@/services/casesServices";
  import { downloadFile } from "@/helpers/handleDownloadFile";

  const InforBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const DataTable = defineAsyncComponent(() => import("@/components/table/DataTable.vue"));
  const Spinner = defineAsyncComponent(() => import("@/components/commons/MainSpinner.vue"));
  const DownloadButton = defineAsyncComponent(() => import("@/components/commons/MainButton.vue"));
  const caseStore = useCaseStore();
  const mainStore = useMainStore();
  const router = useRouter();
  
  const titles : Array < string > = [
    "id",
    "remitente",  
    "Beneficiario",
    "prioridad",
    "status",
    "analista encargado"
  ]

  const on_picked_element = (elm:string) => {
    //open page with all case information + diary book
    router.push({name:"update-case", params:{ id:elm }});
  }

  const SearchData = async (search :string) => {
    mainStore.search = search;
    if(mainStore.getSearch.length >= 5) {
      const resp = await caseStore.setCaseList(mainStore.getSearch);
      if(resp ==="200") mainStore.setPage(1);
    }
    else caseStore.setCaseList();
  }

  onMounted(async () => {
    try{
      const resp = await caseStore.setCaseList();
      console.log(resp)
    }catch(e){
      console.log(e);
    }
  });

  const DownloadFile = async () => {
    const resp: any = await downloadCasesExcel();
    if(resp.status == 200) downloadFile(resp.data);
    else console.log("no hay registros");
  }

  onUnmounted(() =>{
    caseStore.$reset();
  })
</script>

<template>
    <div class="w-full h-full">

        <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
            <InforBar class="text-gray-400"/>
        </div>

        <h1 class="text-3xl text-white uppercase my-10">
            Casos Generales
        </h1>

        <div class="w-full h-[80%] relative" v-if="caseStore.getCaseList.length > 0">
          <DownloadButton 
            title="" 
            icon="download" 
            :full-size="false" 
            class="absolute bottom-14 right-4 w-10 h-10 shadow-md"
            @click="DownloadFile"/>

          <DataTable 
            :titles="titles" 
            :data="caseStore.getCaseList" 
            :elements-per-page="mainStore.getPerPages" 
            :total-pages="mainStore.getTotalPages" 
            @picked-element="on_picked_element"
            @button-action="router.push({ name:'add-case' })"
            @search-data="SearchData"/>

        </div>
        <div class="w-full h-[80%] text-center flex items-center justify-center" v-else >
          <p class="text-white font-semibold mr-3">Esperando nuevos casos ... </p>
          <Spinner class="mt-[-5px]"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>