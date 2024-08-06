<script setup lang="ts">  
    const props = defineProps<{
        date:string,
        description:string
    }>()
</script>

<template>
    <div> 
        <div class="w-[620px] border border-blue-500" v-if="props.date && props.description" >
            <p>{{ props.date }} :</p>
            <p class="w-full">{{ props.description }}</p>
        </div>
        <div v-else>
            <p class="text-center mt-20">Cargando data ...</p>
        </div>
    </div>
</template>
 
<style scoped lang="scss">

</style>