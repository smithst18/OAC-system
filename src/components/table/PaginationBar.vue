<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    totalpages: number,
    elementsPerPage: number,
    results: number,
    visiblePages: number,
    activeIndex: number | 1,
    totalResults?: number
}>();

const emit = defineEmits<{
  (event: "dataPagination", page: number): void;
  (event: "nextPage"): void;
  (event: "prevPage"): void;
}>();

// Cálculo del rango de páginas visibles
const startPage = computed(() => Math.max(1, props.activeIndex - Math.floor(props.visiblePages / 2)));
const endPage = computed(() => Math.min(props.totalpages, startPage.value + props.visiblePages - 1));

// Cálculo de los resultados visibles
const endOfPage = computed(() => Math.min(props.activeIndex * props.elementsPerPage, props.totalResults || props.results));
const startOfPage = computed(() => endOfPage.value - props.elementsPerPage + 1);
</script>

<template>
  <div class="flex items-center w-full h-10">
    <div>
      <span class="ml-2 text-white">
        mostrando 
        {{ results }} 
        elementos 
        de 
        {{ startOfPage }} hasta {{ endOfPage }} resultados 
        <span v-if="totalResults">, total global : {{ totalResults }} </span>
      </span>
    </div>
    <nav class="mx-auto bg-primary rounded-2xl">
      <ul>
        <li @click="emit('prevPage')" class="text-third">
          <a href="#" class="text-xl">&lt;</a>
        </li>

        <!-- Generar las páginas visibles -->
        <li
          v-for="page in endPage - startPage + 1"
          :class="[ 
            { 'bg-primary text-white': props.activeIndex === page + startPage - 1 },
            { 'text-third': props.activeIndex !== page + startPage - 1 },
          ]"
          :key="page + startPage - 1"
          @click="emit('dataPagination', page + startPage - 1)">
          <a href="#" 
            :class="{ 'bg-white text-slate-800 px-2': props.activeIndex === page + startPage - 1 }"> 
            {{ page + startPage - 1 }} 
          </a>
        </li>

        <li @click="emit('nextPage')" class="text-third">
          <a href="#" class="text-xl">></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
  nav>ul {
    @apply list-none flex;
  }
  li {
    @apply h-2 w-6;
  }
  nav>ul>li {
    @apply mx-3 py-1 text-center cursor-pointer my-auto h-full;
  }
</style>
