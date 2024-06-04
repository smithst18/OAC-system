<script setup lang="ts">
import { computed, ref } from "vue";

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
const endOfPage =  computed(() => activeIndex.value * props.elementsPerPage);
const startOfPage = computed(() => endOfPage.value - props.elementsPerPage + 1);

</script>

<template>
  <div class="flex items-center w-full h-full">
    <div class="">
      <span class="ml-2">{{ startOfPage }} a {{ endOfPage }} elementos de {{ results }} resultados totales</span>
    </div>
    <nav class="ml-auto">
      <ul class="">
        <li @click="prevArroy"><a href="#">&lt;</a></li>

        <li
          v-for="(page, index) in visiblePages"
          :class="[
            { 'bg-primary text-white': activeIndex === page },
            { 'text-zinc-600': activeIndex !== page },
          ]"
          :key="page"
          @click="clickedPage(page,index)">
          <a href="#"> {{ page }} </a>
        </li>

        <li @click="nextArroy"><a href="#">></a></li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
  nav>ul {
    @apply list-none flex items-center justify-end;
  }
  nav>ul>li {
    @apply border rounded-md mx-1 py-1 w-8 h-8 text-center cursor-pointer hover:text-white hover:bg-primary;
  }
</style>