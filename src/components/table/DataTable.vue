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
        <div class="w-full h-full hidden md:block">
            <!-- head of the table-->
            <div class="flex my-4">
                <SearchingBar @on-search-data="searchData($event)" class="flex ml-auto border-2 border-primary opacity-80  bg-third rounded-2xl px-3"/>
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
                        <tr v-for="(elm) in paginatedData" :key="elm">
                            <td class="text-sm capitalize text-left whitespace-nowrap overflow-x-auto"
                                v-for="(property, propertyName, index) in elm" :key="index">
                                <p class="p-8">
                                    {{ property }}
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
                    @dataPagination="getDataPagination"
                    @prevPage="getPreviusPage"
                    @nextPage="getNextPage"
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