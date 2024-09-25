<script setup lang="ts">
  import { ref } from 'vue';
  const props = defineProps<{
    text:string
  }>();
  
  const visible = ref(false);
  
  const showTooltip = () => {
    visible.value = true;
  };
  
  const hideTooltip = () => {
    visible.value = false;
  };
</script>

<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <transition name="fade">
      <div v-if="visible" class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm bg-primary text-white rounded shadow-lg">
        {{ text }}
      </div>
    </transition>
  </div>
</template>

 
<style scoped lang="scss">
/* Transiciones para cuando el tooltip aparece y desaparece */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px); /* Desplaza hacia abajo cuando aparece */
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0); /* El tooltip termina en su posición original */
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0); /* El tooltip empieza desde su posición original */
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* Desplaza hacia arriba cuando desaparece */
}
</style>