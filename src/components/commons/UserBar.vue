<script setup lang="ts">
  import { useMainStore } from "@/stores/mainStore";
  const mainStore = useMainStore();

</script>

<template>
  <h1 class="text-3xl text-primary uppercase my-10">Hola!, {{ mainStore.logedUser.name }}</h1>
</template>
 
<style scoped lang="scss">

</style>