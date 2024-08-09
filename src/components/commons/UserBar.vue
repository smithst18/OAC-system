<script setup lang="ts">
  import { useMainStore } from "@/stores/mainStore";
  import { ref } from "vue";
  const mainStore = useMainStore();

</script>

<template>
  <h1 class="text-3xl text-white uppercase my-10">Hola!, {{ mainStore.logedUser.name }}</h1>
</template>
 
<style scoped lang="scss">

</style>