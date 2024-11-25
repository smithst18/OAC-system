<script setup lang="ts">
  const props = defineProps<{
    cols: number;
  }>();
</script>

<template>
  <form :class="['p-16', `grid grid-cols-${props.cols}`, 'gap-x-9', 'w-full']" novalidate>
    <slot name="content"></slot>          
  </form>
</template>
