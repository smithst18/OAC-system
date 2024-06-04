<script setup lang="ts">
import { ref } from 'vue';
const props =  defineProps<{
    options:Array<string>;
}>();
const emit = defineEmits <{
    (event:'filterData',payload:string):void,
}>();

const showFilters = ref(false);
const toggleFilters = () => showFilters.value = !showFilters.value;

const sendFilter = (filter:string) =>{
    emit('filterData',filter);
    toggleFilters();
}
</script>
<template>
    <div class="relative">
        <button @click="toggleFilters"> 
            <span class="material-symbols-outlined font-semibold">
                filter_list
            </span>
            <p class="ml-2">Filtrar</p>
        </button>
        <ol v-if="showFilters" class="absolute w-full bg-gray-100 border">
            <li v-for="option in options" :key="option" class="text-center p-2" @click="sendFilter(option)"> <a href="#" class="capitalize">{{ option }}</a></li>
        </ol>
    </div>
</template>

<style lang="scss" scoped>
button{
    @apply border flex items-center h-11 bg-gray-100 text-gray-700 font-medium px-3 rounded-sm hover:opacity-75 transition ease-in-out delay-75 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200
}
</style>