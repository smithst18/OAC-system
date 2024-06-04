<script setup lang="ts">
import { ref } from 'vue';
  const time = ref(new Date().toLocaleString('es-US', { hour: 'numeric', minute: '2-digit' }))
  const date = ref(new Date().toLocaleString('es-US', { day: 'numeric', month: 'long', weekday: 'long' }))
</script>

<template>
  <div class="bg-white w-full h-[8%] rounded-md flex items-center px-5 text-gray-400 capitalize">
    <p class="text-xl">{{ time }}  |  {{ date }}</p>
    <div class="ml-auto flex">
      <p class="mr-5"> icon1 </p>
      <p>icon 2</p>
    </div>
  </div>
</template>
 
<style scoped lang="scss">

</style>