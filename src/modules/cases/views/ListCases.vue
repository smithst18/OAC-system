<script setup lang="ts">
  import { defineAsyncComponent, onMounted, onUnmounted } from "vue";
  import { useRouter } from 'vue-router';
  import { useCaseStore } from "@/modules/cases/store/caseStore";
  import { useMainStore } from "@/stores/mainStore";
  import { downloadCasesExcel } from "@/services/casesServices";
  import { downloadFile } from "@/helpers/handleDownloadFile";
  import { useToast } from "@/composables/useToast";

  const InforBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const DataTable = defineAsyncComponent(() => import("@/components/table/DataTable.vue"));
  const Spinner = defineAsyncComponent(() => import("@/components/commons/MainSpinner.vue"));
  const DownloadButton = defineAsyncComponent(() => import("@/components/commons/MainButton.vue"));
  const caseStore = useCaseStore();
  const mainStore = useMainStore();
  const router = useRouter();
  const toast = useToast()
  
  const titles : Array < string > = [
    "#",  
    "Num",
    "cedula",  
    "estatus",
    "entidad",
    "tipo de solicitud",
  ]

  const on_picked_element = (elm:string) => {
    //open page with all case information + diary book
    router.push({name:"update-case", params:{ id:elm }});
  }

  const SearchData = async (search :string) => {
    mainStore.search = search;
    if(mainStore.getSearch.length >= 1) {

      const resp = await caseStore.setCaseList(mainStore.getSearch);

      if(resp ==="200"){
        //si la respuesta es buena seteamos a pagina 1 y enviamos notificaicon
        mainStore.setPage(1);
        toast.successToast("Casos Mostrados correctamente")
      }
      else if(resp ==="404"){
        //si no encontramos casos seteamos la lista a su valor por defecto  y enviamos alerta
        mainStore.search = '';
        caseStore.setCaseList();
        toast.warnToast("No se han encontrado casos ")
      }
      // si hay un error de servidor notificamos
      else toast.errorToast("Error en el servidor")
    }
    else caseStore.setCaseList();
  }

  onMounted(async () => {
    try{
      const resp = await caseStore.setCaseList();
      if(resp =="200") console.log("table data cargada ");
      else console.log("error table data no cargada ");
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
  });
</script>

<template>
    <div class="w-full h-full">

        <div class="bg-cyan-50 border border-cyan-500 shadow-md rounded-2xl w-full h-[8%]">
            <InforBar class="text-gray-400"/>
        </div>

        <h1 class="text-3xl text-primary uppercase my-10">
            Casos Generales
        </h1>

        <div class="w-full h-[75%] relative" v-if="caseStore.getCaseList.length > 0"> 
          <DataTable 
          :titles="titles" 
          :data="caseStore.getCaseList" 
          :elements-per-page="mainStore.getPerPages" 
          :total-pages="mainStore.getTotalPages" 
          :show-search-bar="true"
          @picked-element="on_picked_element"
          @button-action="router.push({ name:'add-case' })"
          @search-data="SearchData"/>
          
          <DownloadButton 
            title="" 
            icon="download" 
            :full-size="false" 
            class="absolute bottom-14 right-4 w-10 h-10 shadow-md"
            @click="DownloadFile"/>
        </div>
        <div class="w-full h-[80%] text-center flex items-center justify-center" v-else >
          <p class="text-primary font-semibold mr-3">No hay Casos para el año en curso ... </p>
          <Spinner class="mt-[-5px]"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>