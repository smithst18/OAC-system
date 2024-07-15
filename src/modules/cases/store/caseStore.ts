import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { saveCaseService } from '@/services/casesServices';
import { useMainStore } from '@/stores/mainStore';

export const useCaseStore = defineStore('case', () => {

  // =======================> STATE
  const mainStore = useMainStore();
  // =======================> SETTERS
  const saveCase = async (form:object) => {

    const data = await saveCaseService(form);

    if(data.savedCase) return "200";
    else if(data.response){ 
      mainStore.changeRequestStatus(false)
      return "403"
    }
    else{
      mainStore.changeRequestStatus(false)
      return "500";
    };
  }
  // =======================> GETTERS

  
  return {
    saveCase
  }
});