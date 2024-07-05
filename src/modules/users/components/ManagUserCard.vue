<script setup lang='ts'>
    import userCard from '@/components/commons/userCard.vue';
    const props = defineProps<{
      name:string,
      rol:string,
      phoneNumber:string,
    }>();
</script>

<template>
    <div class="grid grid-cols-4 capitalize"> 
        <div class="col-span-1 border flex">
            <div class="w-12 m-auto">
                <userCard :is_spanded="false" class="cursor-pointer w-12"/>
            </div>
        </div>
        <div class="col-span-1 border text-center">
            <p class="font-semibold ">
                {{ props.name }}
            </p>
            <p class="text-sm opacity-80">
                OAC
            </p>
        </div>
        <div class="col-span-1 border">
            <p class="rounded-lg text-center w-fit px-2 text-sm m-auto mt-2" :class="[
                { 'bg-red-200 border border-red-400 text-red-600 font-medium': props.rol === 'admin' },
                { 'bg-blue-100 border border-blue-400 text-blue-600 font-medium': props.rol === 'auditor' },
                { 'bg-slate-200 border border-slate-400 text-slate-600': props.rol === 'normal' },
             ]">
                {{ rol }} 
            </p>
        </div>
        <div class="col-span-1 border">
            <p class="text-center mt-2">{{props.phoneNumber}}</p>
        </div>
    </div>
</template>

<style scoped lang='scss'>

</style>