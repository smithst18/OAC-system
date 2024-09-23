<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    totalpages:number,
    elementsPerPage: number,
    results: number,
    visiblePages: number,
    activeIndex:number | 1,
    totalResults?:number
}>();

const emit = defineEmits<{
  (event: "dataPagination", page: number): void;
  (event: "nextPage"): void;
  (event: "prevPage"): void;
}>();

const endOfPage =  computed(() => props.activeIndex * props.elementsPerPage);
const startOfPage = computed(() => endOfPage.value - props.elementsPerPage + 1);

</script>

<template>
  <div class="flex items-center w-full h-10">
    <div class="">
      <span class="ml-2 text-white">
        mostrando 
        {{ results }} 
        elementos 
        de 
        {{ startOfPage }} hasta {{ endOfPage }} resultados 
        <span v-if="totalResults">, total global : {{ props.totalResults }} </span>
      </span>
    </div>
    <nav class="mx-auto bg-primary rounded-2xl">
      <ul class="">
        <li @click="emit('prevPage')" class="text-third"><a href="#" class="text-xl">&lt;</a></li>

        <li
          v-for="(page, index) in visiblePages"
          :class="[
            { 'bg-primary text-white': props.activeIndex === page },
            { 'text-third': props.activeIndex !== page },
          ]"
          :key="page"
          @click="emit('dataPagination', page)">
          <a href="#" 
            :class="{ 'bg-white text-slate-800 px-2': props.activeIndex === page }"> 
              {{ page }} 
          </a>
        </li>

        <li @click="emit('nextPage')" class="text-third"><a href="#" class="text-xl">></a></li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
  nav>ul {
    @apply list-none flex;
  }
  li{
    @apply h-2 w-6
  }
  nav>ul>li {
    @apply mx-3 py-1 text-center cursor-pointer my-auto h-full;
  }
</style>