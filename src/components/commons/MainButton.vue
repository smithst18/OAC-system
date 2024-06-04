<script setup lang="ts">
    const props =  defineProps<{
        title: string,
        fullSize: Boolean,
        icon?:string,
    }>();

</script>
<template>
    <button class="px-4 py-2 rounded-md bg-primary text-secondary text-sm hover:bg-primary-light transition ease-in-out delay-75 active:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light flex items-center"
            :class="{'w-full' : fullSize}">
            <span class="material-symbols-outlined text-xl mr-2" v-if="icon">
                {{ props.icon }}
            </span>
            
            <span class="m-auto">{{ props.title }}</span>
    </button>
</template>