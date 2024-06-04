<script setup lang='ts'>
    const props =  defineProps<{
        title: string,
        notifications:number,
        routName: string,
        type:string
    }>();  
</script>

<template>
    <div> 
        <router-link :to="{ name:routName, params:{ type:type }}" v-slot="{ isActive }">
            <div class="flex active my-2" :class=" isActive ? 'active' : 'unactive' ">
                <!-- NAVBAR ITEM TITLE-->
                <div class="text-lg">
                    {{ title }}
                </div>
                <!-- NOTIFICATIONS ICON -->
                <div class="relative ml-2" v-if="notifications > 1">
                    <div class="w-[16px] h-[16px] left-0 top-0 absolute bg-red-600 bg-opacity-70 rounded-full"></div>
                    <div class="w-1 h-3 left-[5px] top-[3px] absolute text-center text-white text-xs font-normal leading-none">
                        {{ notifications }}
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<style scoped lang='scss'>
    .active {
        @apply mr-8 underline underline-offset-[8px] decoration-solid decoration-2 decoration-primary
    } 
    .unactive {
        @apply mr-8 opacity-75 no-underline font-normal
    }

</style>