<script setup lang='ts'>
import SearchingBar from "@/components/commons/SearchBar.vue";
import PaginationBar from "@/components/table/PaginationBar.vue"
import { useDataTable } from "@/composables/useDataTble"; 
import { computed, onMounted, defineAsyncComponent } from "vue";
import { useCaseStore } from "@/modules/cases/store/caseStore";
import type { Case } from "@/interfaces/caseInterface";
const caseStore = useCaseStore();
const Button =  defineAsyncComponent(() => import("@/components/commons/MainButton.vue"));
const props =  defineProps<{
    titles: Array <string>,
    data:Array<Case>,
    elementsPerPage:number
    totalPages:number,
}>();
const emit = defineEmits<{
  (event: "pickedElement", id: string): void;
  (event: "searchData", search: string): void;
  (event: "buttonAction"): void;
  (event: "getPreviusPage"): void;
  (event: "getNextPage"): void;
}>();

    const { 
        pages,
        actualPage,
        visiblePages,
        getDataPagination,
        getNextPage,
        getPreviusPage,
    } = useDataTable(
      props.data,
      props.elementsPerPage,
      props.totalPages
    ); 

    //propiedad computed para los resultados
    const results =  computed(() => props.data.length );

    const nextPage = async() =>{
      //desde estas funciones se valida si el total de paginas el posible incrementar o decrementar y en dado caso se llama a la function de composable get next page luego se modifica la pagina en el store y luego se setea la nueva lista de users en el store para que asi se modifique la tabla 
      if(caseStore.page <= caseStore.totalPages ){
        getNextPage();
        caseStore.NextPage();
        await caseStore.setCaseList();
      }
      
    }
    
    const setDataPagination = async (page: number) => {
      caseStore.page = page;
      await caseStore.setCaseList()
    }

    const prevPage = async() =>{
      if(caseStore.totalPages > 1){
        getPreviusPage();
        caseStore.PrevPage();
        await caseStore.setCaseList();
      }
    }
    onMounted(() => getDataPagination(actualPage.value));
</script>

<template>
    <div class="w-full h-full">
        <div class="w-full h-full hidden md:block">
            <!-- head of the table-->
            <div class="flex items-center justify-end my-4">
              <Button 
              :full-size="false" 
              icon="Add" 
              title="" 
              @doSomething="$emit('buttonAction')"
              class=" mr-5"></Button>
              <SearchingBar @on-search-data="emit('searchData',$event)" class=""/>
            </div>
            <!-- body for the table -->
            <div class="w-full h-[70%] overflow-auto">

                <table class="table-fixed  w-full text-sm border-collapse relative border-2 border-t-0 border-primary-light  zebra-stripe ">
                    <!-- TITLES FOR TABLE DATA -->
                    <thead class="sticky top-0 drop-shadow-sm">
                        <tr class="">
                            <th class="p-8 bg-primary text-sm font-semibold tracking-wide uppercase text-left text-third"
                                v-for="title in titles" :key="title">
                                {{ title }}
                            </th>
                        </tr>
                    </thead>

                    <tbody class="">
                        <tr v-for="(elm) in data" :key="elm._id">
                            <td class="text-sm capitalize text-left whitespace-nowrap overflow-x-auto"
                                v-for="(property, propertyName, index) in elm" :key="index" 
                                @click="emit('pickedElement',elm._id)">
                                <p class="p-8" v-if="propertyName !== '_id'">
                                    {{ property }}
                                </p>
                                <p class="p-8" v-if="propertyName == '_id'">
                                    {{ property.substring(property.length - 5) }}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--pagination component-->
            <div class=" mt-2 w-full h-10">
                <PaginationBar 
                    :pages="pages" 
                    :visible-pages="visiblePages"
                    :elementsPerPage="props.elementsPerPage"
                    :results="results"
                    @dataPagination="setDataPagination($event)"
                    @prevPage="prevPage"
                    @nextPage="nextPage"
                />
            </div>
        </div>
    </div>
</template>
    
    
<style scoped lang="scss">
// table tbody tr td:first-child {
//     @apply cursor-pointer hover:text-primary font-semibold;
// }
thead {
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
}

td::-webkit-scrollbar{
    @apply hidden
}
.zebra-stripe tbody tr:nth-child(odd) {
    @apply bg-primary-light bg-opacity-50 text-third hover:text-primary cursor-pointer
}

/* Estilo para filas pares */
.zebra-stripe tbody tr:nth-child(even) {
    @apply bg-third bg-opacity-80 text-gray-700 hover:text-primary cursor-pointer
}
</style>