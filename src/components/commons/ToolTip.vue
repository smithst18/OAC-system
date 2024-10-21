<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue';
  
  const props = defineProps<{
    text: string
  }>();

  const visible = ref(false);
  const tooltipRef = ref<HTMLElement | null>(null);
  const position = ref('bottom'); // Default position for tooltip

  const showTooltip = () => {
    visible.value = true;
    nextTick(() => {
      adjustTooltipPosition();
    });
  };

  const hideTooltip = () => {
    visible.value = false;
  };

  const adjustTooltipPosition = () => {
    if (tooltipRef.value) {
      const tooltipRect = tooltipRef.value.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // Verifica si el tooltip se desborda hacia la derecha del contenedor
      if (tooltipRect.right > windowWidth) {
        position.value = 'left'; // Cambia la posición a la izquierda si hay desbordamiento a la derecha
      } else if (tooltipRect.left < 0) {
        position.value = 'right'; // Cambia a la derecha si hay desbordamiento a la izquierda
      } else {
        position.value = 'bottom'; // Si no hay desbordamiento, mantenlo en la posición predeterminada
      }
    }
  };

  onMounted(() => {
    nextTick(() => {
      adjustTooltipPosition();
    });
  });
</script>

<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <transition name="fade">
      <div 
        v-if="visible" 
        ref="tooltipRef" 
        :class="['tooltip', position]" 
        class="absolute px-2 py-1 text-sm bg-primary text-white rounded shadow-lg"
      >
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
/* Transiciones para el tooltip */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px); /* Desplazado hacia abajo */
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0); /* Termina en su posición original */
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0); /* Empieza desde su posición original */
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* Desplazado hacia arriba */
}

/* Posiciones del tooltip con margen para separarlo del elemento */
.tooltip.bottom {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px; /* Añade separación en la parte inferior */
}

.tooltip.left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  margin-right: 8px; /* Añade separación a la izquierda */
}

.tooltip.right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 8px; /* Añade separación a la derecha */
}

/* Flecha del tooltip */
.tooltip::before {
  content: "";
  position: absolute;
  border-style: solid;
}

.tooltip.bottom::before {
  top: 100%; /* Coloca la flecha debajo del tooltip */
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px 5px 0 5px; /* Tamaño de la flecha */
  border-color: #0d6efd transparent transparent transparent; /* Color de la flecha */
}

.tooltip.left::before {
  top: 50%;
  left: 100%; /* Coloca la flecha a la derecha del tooltip */
  transform: translateY(-50%);
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent #0d6efd;
}

.tooltip.right::before {
  top: 50%;
  right: 100%; /* Coloca la flecha a la izquierda del tooltip */
  transform: translateY(-50%);
  border-width: 5px 5px 5px 0;
  border-color: transparent #0d6efd transparent transparent;
}
</style>
