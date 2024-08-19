<script setup lang="ts">
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/mainStore';
  const { logOut, logedUser } = useMainStore();
  const time = ref(new Date().toLocaleString('es-US', { hour: 'numeric', minute: '2-digit' }));
  const date = ref(new Date().toLocaleString('es-US', { day: 'numeric', month: 'long', weekday: 'long' }));
</script>

<template>
  <div class="w-full h-full flex items-center px-5 capitalize">
    <p class="text-xl">{{ time }}  |  {{ date }}</p>
    <div class="ml-auto flex">
      <p class="material-symbols-outlined mr-3 text-lg cursor-pointer" v-if="logedUser.rol === 'admin'" @click="$router.push({ name:'management' })">settings</p>
      <p class="material-symbols-outlined mr-3 text-lg cursor-pointer" @click="logOut">logout</p>
    </div>
  </div>
</template>
 
<style scoped lang="scss">

</style>