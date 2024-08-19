<script setup lang="ts">
  import { ref} from 'vue';
  import { useMainStore } from "@/stores/mainStore";
  import { useCaseStore } from '@/modules/cases/store/caseStore';
  const mainStore = useMainStore();
  const caseStore = useCaseStore();
  const emit = defineEmits<{
      ( event:'onSearchData', value:string ): void,
  }>();
  const dataToFind = ref<string>("");
  const input = ref<any>(undefined)
  const VFocus = {
    mounted: (el:HTMLElement) => el.focus(),

  }

  const clearDataToFind = () =>{
    dataToFind.value = "";
    input.value.focus();
    emit('onSearchData','');
    mainStore.search = '';
    mainStore.setPage(1);
  }
</script>

<template>
    <div class="border-2 border-primary opacity-80  bg-third rounded-2xl px-3">
        <div class="flex items-center rounded-md p-2">
          <div class="flex items-center w-[80%]">
            <input 
                v-focus
                ref="input"
                type="text" 
                placeholder="buscar" 
                class="focus:border-b-2 focus:border-b-primary-light border-opacity-65 p-1 bg-transparent placeholder-third-light-400 text-slate-700 ml-1 focus:outline-none" 
                v-model="dataToFind"
                @keypress.enter="emit('onSearchData', dataToFind)">
            <span class="text-sm flex cursor-pointer hover:opacity-70 material-symbols-outlined text-red-400 font-black" 
            @click="clearDataToFind"
            v-if="dataToFind != ''">
              close
            </span> 
          </div>
          <span class="w-6 h-6 ml-auto pl-2 cursor-pointer hover:opacity-70 material-symbols-outlined text-primary font-black" @click="$emit('onSearchData',dataToFind)">
            search
          </span> 
        </div>
    </div>
</template>
      
<style scoped>
    
</style>