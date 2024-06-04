<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';
    import type { NavbarLink } from "@/interfaces/sidebarInterface"
    const NavbarItem = defineAsyncComponent(() => import('@/components/navbar/NavbarItem.vue'));
    const props = defineProps<{
        routParams:Array<NavbarLink>
        
    }>();

</script>

<template>
     <nav class="flex items-center">
        <ul class="flex">
            <li class="" v-for="rout in routParams" :key="rout.name"> 
                <NavbarItem :title="rout.title" :notifications="rout.notifications" :rout-name="rout.name" :type="rout.type"/>
            </li>
        </ul>
        <!-- aditionals elements for navbar -->
        <div class="ml-auto">
            <slot name="extra-element"></slot>
        </div>
    </nav>
</template>

<style scoped lang="scss"> 

</style>