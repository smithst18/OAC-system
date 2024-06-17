<script setup lang="ts">
    import { ref} from 'vue';
    const emit = defineEmits<{
        ( event:'onSearchData', value:string ): void,
    }>();

    const dataToFind = ref('');

</script>

<template>
    <div>
        <div class="flex bg-swhite p-1">
            <input 
                type="text" 
                placeholder="buscar" 
                class="bg-transparent placeholder-third-light-400 text-slate-700 ml-3 focus:outline-none" 
                v-model="dataToFind"
                @keypress.enter="emit('onSearchData', dataToFind)">
                <span class="w-6 h-6 flex m-auto cursor-pointer hover:opacity-70 material-symbols-outlined text-primary font-black" @click="$emit('onSearchData',dataToFind)">
                  search
                </span> 
        </div>
    </div>
</template>
      
<style scoped>
    
</style>