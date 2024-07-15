<script setup lang="ts">
    const props =  defineProps<{
        title: string,
        fullSize: Boolean,
        icon?:string,
    }>();
</script>
<template>
    <button 
      class="px-4 py-2 rounded-md bg-primary text-white text-sm hover:bg-primary-light transition ease-in-out delay-75 active:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light flex items-center"
            :class="{'w-full' : fullSize}" @click="$emit('doSomething')">
      <div class="flex w-full justify-center items-center text-center mr-2" v-if="props.title != ''">
        <span class="">{{ props.title }}</span>
      </div>
      <span class="material-symbols-outlined text-xl" v-if="icon">
          {{ props.icon }}
      </span>
      <slot class="">
      </slot>
    </button>
</template>