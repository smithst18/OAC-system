<script setup lang='ts'>
  import SearchingBar from "@/components/commons/SearchBar.vue";
  import PaginationBar from "@/components/table/PaginationBar.vue"
  import { useDataTable } from "@/composables/useDatatable"; 
  import { computed, defineAsyncComponent, onUnmounted } from "vue";
  import { useCaseStore } from "@/modules/cases/store/caseStore";
  import { useMainStore } from "@/stores/mainStore";
  const Button =  defineAsyncComponent(() => import("@/components/commons/MainButton.vue"));
  const ToolTip = defineAsyncComponent(() => import('@/components/commons/ToolTip.vue'));

  const props =  defineProps<{
      titles: Array <string>,
      data:Array<any>,
      elementsPerPage:number
      totalPages:number,
      showSearchBar:boolean 
  }>();

  const emit = defineEmits<{
    (event: "pickedElement", id: string): void;
    (event: "searchData", search: string): void;
    (event: "buttonAction"): void;
    (event: "getPreviusPage"): void;
    (event: "getNextPage"): void;
  }>();

  const mainStore = useMainStore();
  const caseStore = useCaseStore();
  const { 
    activeIndex,
    nextPage,
    setDataPagination,
    prevPage,
    setActiveIndex
  } = useDataTable(mainStore.getPage);

  //propiedad computed para los resultados
  const results =  computed(() => props.data.length );


  const setNextPage = async() =>{
    nextPage(async () => await caseStore.setCaseList(mainStore.getSearch))
  }
  
  const setDataPaginations = async (page: number) => {
    setDataPagination(page,async () => await caseStore.setCaseList(mainStore.getSearch))
  }

  const setPrevPage = async() =>{
    prevPage(async () => await caseStore.setCaseList(mainStore.getSearch))
  }

  const handleSearchData = (value:string) => {
    console.log(value)
    //seteamos el index en el composable a 1 para que se vea reflejado y evitar erroes 
    setActiveIndex(1);
    //seteamos la pagina en el store tambien a 1 
    mainStore.setPage(1)
    //emitimos el valor
    emit('searchData', value)
  }

  onUnmounted(() =>{
    // this trigger a function that reset the store of pagination component
    mainStore.$resetPaginator();
  })
</script>

<template>
  <div class="w-full h-full flex flex-col">
      <!-- Head of the table (button and search) -->
      <div class="w-full flex-shrink-0">
          <div class="flex items-center justify-end my-4" v-if="showSearchBar">
            <ToolTip text="Anadir Caso">
              <Button 
                :full-size="false" 
                icon="Add" 
                title="" 
                @doSomething="$emit('buttonAction')"
                class="mr-5">
              </Button>
            </ToolTip>
            <SearchingBar @on-search-data="handleSearchData" class=""/>
          </div>
      </div>

      <!-- Table body with scroll -->
      <div class="w-full flex-grow overflow-auto">
          <table class="table-fixed w-full text-sm border-collapse relative border-2 border-t-0 border-third zebra-stripe">
              <!-- TITLES FOR TABLE DATA -->
              <thead class="sticky top-0 drop-shadow-sm">
                  <tr>
                      <th class="p-8 bg-primary text-sm font-semibold tracking-wide uppercase text-left text-third"
                          v-for="title in titles" :key="title">
                          {{ title }}
                      </th>
                  </tr>
              </thead>

              <tbody>
                  <tr v-for="(elm) in data" :key="elm._id">
                      <td class="text-sm capitalize text-left whitespace-nowrap overflow-x-auto"
                          v-for="(property, propertyName, index) in elm" :key="index" 
                          @click="emit('pickedElement', elm._id)">
                          <p class="p-8">
                              {{ property }}
                          </p>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <!-- Pagination Bar -->
      <div class="w-full h-10 flex-shrink-0 mt-auto" v-if="mainStore.showPagination">
          <PaginationBar 
            class="w-full h-full"
            :totalpages="mainStore.getTotalPages" 
            :visible-pages="10"
            :elementsPerPage="props.elementsPerPage"
            :results="results"
            :total-results="mainStore.getTotalResults"
            :active-index="activeIndex"
            @dataPagination="setDataPaginations($event)"
            @prevPage="setPrevPage"
            @nextPage="setNextPage"
          />
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
    @apply bg-primary text-third hover:text-secondary hover:font-bold hover:bg-opacity-95 cursor-pointer
}

/* Estilo para filas pares */
.zebra-stripe tbody tr:nth-child(even) {
    @apply bg-third bg-opacity-80 text-gray-700 hover:text-primary hover:font-bold cursor-pointer
}
</style>