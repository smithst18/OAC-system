<script setup lang="ts">
  import { defineAsyncComponent, ref, onMounted, onUnmounted } from "vue";
  import { useRouter } from 'vue-router';
  import { useCaseStore } from "../store/caseStore";

  const InforBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const DataTable = defineAsyncComponent(() => import("@/components/table/DataTable.vue"));

  const caseStore = useCaseStore();
  const router = useRouter();
  const toSearchData = ref('');
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

  const SearchData = async (search: string) => {
    if(search.length >= 5) caseStore.setCaseList(search);
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

        <div class="w-full h-[80%]" v-if="caseStore.getCaseList.length > 0">
            <DataTable 
            :titles="titles" 
            :data="caseStore.getCaseList" 
            :elements-per-page="caseStore.getPerPages" 
            :total-pages="caseStore.getTotalPages" 
            @picked-element="on_picked_element"
            @button-action="router.push({ name:'add-case' })"
            @search-data="SearchData($event)"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>