<script lang="ts" setup>
  import type { Link } from '@/interfaces/sidebarInterface';
  import { computed } from 'vue';

  const props = defineProps<{
    icon: string,
    title: string,
    link: Link,
    is_spanded: boolean
  }>();
  
  const rout = computed(() =>  { return { name:props.link.to } }) ;

  const emit = defineEmits<{
      (event:'inFocus'):void,
  }>();

</script>

<template>
  <div @click="emit('inFocus')" class="pb-2 cursor-pointer">
    <router-link 
      :to="rout"
      v-slot="{ isActive }">
      <div class="menu-item" :class="{ 'text-white bg-secondary': isActive }">
        <span class="material-symbols-sharp">{{ props.icon }}</span>
        <span class="menu-text">{{ props.title }}</span>
      </div> 
    </router-link>
  </div>
</template>
          
<style scoped lang="scss">
</style>