<script setup lang="ts">

import { defineAsyncComponent } from "vue";
const InforBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));

</script>

<template>
    <div class="w-full h-full">
      <InforBar/>
      <h1 class="text-3xl text-white uppercase my-10">Hola, Keyla Goncalves</h1>
      <div>
          aqui da los tipos y otra grfica con texto
      </div>
      <div>
        aqui van las graficas
      </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>
