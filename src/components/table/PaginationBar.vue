<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    pages:number,
    elementsPerPage: number;
    results: number;
    visiblePages: Array<number>;
}>();

const activeIndex = ref(1);

const emit = defineEmits<{
  (event: "dataPagination", page: number): void;
  (event: "nextPage"): void;
  (event: "prevPage"): void;
}>();

const clickedPage = (page: number, index: number) => {
  activeIndex.value = page;
  emit("dataPagination", page);
};

const prevArroy = () => {
  if (activeIndex.value > 1) {
    activeIndex.value -= 1;
    emit("prevPage");
  }
};

const nextArroy = () => {
  if (activeIndex.value < props.pages) {
    activeIndex.value += 1;
    emit("nextPage");
  }
};
// const endOfPage =  computed(() => activeIndex.value * props.elementsPerPage);
// const startOfPage = computed(() => endOfPage.value - props.elementsPerPage + 1);

</script>

<template>
  <div class="flex items-center w-full h-full">
    <div class="">
      <!-- <span class="ml-2">{{ startOfPage }} a {{ endOfPage }} elementos de {{ results }} resultados totales</span> -->
    </div>
    <nav class="mx-auto bg-primary rounded-2xl">
      <ul class="">
        <li @click="prevArroy" class="text-third"><a href="#" class="text-xl">&lt;</a></li>

        <li
          v-for="(page, index) in visiblePages"
          :class="[
            { 'bg-primary text-white': activeIndex === page },
            { 'text-third': activeIndex !== page },
          ]"
          :key="page"
          @click="clickedPage(page,index)">
          <a href="#" 
            :class="{ 'bg-white text-slate-800 px-2': activeIndex === page }"> 
              {{ page }} 
          </a>
        </li>

        <li @click="nextArroy" class="text-third"><a href="#" class="text-xl">></a></li>
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