<script setup lang='ts'>
import SearchingBar from "@/components/commons/SearchBar.vue";
import PaginationBar from "@/components/table/PaginationBar.vue"
import { useDataTable } from "@/composables/useDataTble"; 
import { computed, onMounted } from "vue";

const props =  defineProps<{
    titles: Array <string>,
    data:Array<object>,
    elementsPerPage:number
}>();
const emit = defineEmits<{
  (event: "pickedElement", id: string): void;
}>();

    const { 
        paginatedData,
        pages,
        actualPage,
        visiblePages,
        getDataPagination,
        getPreviusPage,
        getNextPage
    } = useDataTable(props.data,props.elementsPerPage); 

    //propiedad computed para los resultados
    const results =  computed(() => props.data.length );
    //componente barra de busqueda retorna mediante un evento  el string a buscar
    const searchData = (event:string) => { 
        console.log(event);
    }

    onMounted(() => getDataPagination(actualPage.value));
</script>

<template>
    <div class="w-full h-full">
        <div class="w-full h-full hidden md:block shadow-md rounded-md p-2">
            <!-- head of the table-->
            <div class="flex mt-2">
                <p class="text-lg font-semibold">Historial de Tickets</p>
                <SearchingBar @on-search-data="searchData($event)" class="flex ml-auto my-5"/>
            </div>
            <!-- body for the table -->
            <div class="w-full h-[70%] overflow-auto">

                <table class="table-fixed  w-full text-sm border-collapse relative">
                    <!-- <caption class="caption-bottom">
                        Table 3.1: Professional wrestlers and their signature moves.
                    </caption> -->
                    <!-- TITLES FOR TABLE DATA -->
                    <thead class="bg-gray-50 border-gray-200 sticky top-0 drop-shadow-sm">
                        <tr class="">
                            <th class="p-3 text-sm font-semibold opacity-75 tracking-wide capitalize text-left"
                                v-for="title in titles" :key="title">
                                {{ title }}
                            </th>
                        </tr>
                    </thead>

                    <tbody class="">
                        <tr v-for="elm in paginatedData" :key="elm">
                            <td class="text-sm text-third capitalize text-left whitespace-nowrap overflow-x-auto"
                                v-for="(property, index) in elm" :key="index">
                                <p v-if="String(index) !== 'nombre'" class="p-3">
                                    {{ property }}
                                </p>
                                <p v-if="String(index) === 'nombre'" class="p-3"
                                    @click="emit('pickedElement',elm.numero_random)">
                                    {{ property }}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--pagination component-->
            <div class="border-t-2 mt-2 w-full h-10">
                <PaginationBar 
                    :pages="pages" 
                    :visible-pages="visiblePages"
                    :elementsPerPage="props.elementsPerPage"
                    :results="results"
                    @dataPagination="getDataPagination"
                    @prevPage="getPreviusPage"
                    @nextPage="getNextPage"
                />
            </div>
        </div>
        
        <!-- tabla para mobiles ETC -->
        <div class="grid grid-cols-1 gap-4 md:hidden border">
            <div class="bg-white p-4 rounded-lg shadow text-xs">
                <div class="grid grid-cols-2 items-center">
                    <div class="">contenido</div>
                    <div class="">contenido</div>
                </div>
            </div>
        </div>
    </div>
</template>
    
    
<style scoped lang="scss">
table tbody tr td:first-child {
    @apply cursor-pointer hover:text-primary font-semibold;
}
thead {
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
}

td::-webkit-scrollbar{
    @apply hidden
}

</style>