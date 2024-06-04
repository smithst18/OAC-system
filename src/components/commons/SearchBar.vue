<script setup lang="ts">
    import { ref} from 'vue';
    const emit = defineEmits<{
        ( event:'onSearchData', value:string ): void,
    }>();

    const dataToFind = ref('');

</script>

<template>
    <div>
        <div class="flex border bg-swhite p-3 rounded">
            <img src="@/assets/icons/searchicon.svg" alt="" class="w-6 h-6 flex m-auto cursor-pointer hover:opacity-70" @click="$emit('onSearchData',dataToFind)">
            <input 
                type="text" 
                placeholder="buscar" 
                class="bg-transparent placeholder-third-light-400 text-third ml-1 focus:outline-none" 
                v-model="dataToFind"
                @keypress.enter="$emit('onSearchData', dataToFind)">
        </div>
    </div>
</template>
      
<style scoped>
    
</style>