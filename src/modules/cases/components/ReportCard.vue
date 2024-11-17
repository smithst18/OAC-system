<script setup lang="ts">
  const props = defineProps<{
    msg:string
  }>()
</script>

<template>
  <div class="text-center bg-cyan-50 border border-cyan-500 shadow-lg rounded-2xl p-12 mt-8 flex flex-col items-center justify-center">
    <span class="material-symbols-outlined text-6xl text-gray-400 mx-auto mb-4">
      content_paste
    </span>
    <h3 class="text-xl font-medium text-gray-900 mb-2">Sin Data para el Reporte</h3>
    <p class="text-gray-500">
      {{ props.msg }}
    </p>
  </div>
</template>
 
<style scoped lang="scss">

</style>