import { ref } from "vue";
import { useMainStore } from "@/stores/mainStore";

export const useDataTable = (initValue:number) => {

  const mainStore = useMainStore();
  const activeIndex = ref(initValue);

  const nextPage = async(fn: () => Promise<string>) =>{
    
    if(mainStore.getPage < mainStore.getTotalPages ){
      activeIndex.value += 1;
      mainStore.nextPage();
      fn()
    }
    
  }
  
  const setDataPagination = async (page: number, fn: () => Promise<string>) => {

    activeIndex.value = page;
    mainStore.setPage(page);
    fn()

  }

  const prevPage = async(fn: () => Promise<string>) =>{

    if(mainStore.getPage > 1){
      activeIndex.value -= 1;
      mainStore.prevPage();
      fn();
    }

  }

  const setActiveIndex = (value:number) => activeIndex.value = value
  return {
    activeIndex,
    nextPage,
    setDataPagination,
    prevPage,
    setActiveIndex,
  };
};