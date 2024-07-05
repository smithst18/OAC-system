import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userListService } from '@/services/userServices';
import type { boolean } from 'yup';

export const useUserStore = defineStore('user', () => {

  // =======================> STATE
  const userActualList = ref([]);//lista de usuarios
  const page = ref(1);// pagina en la que comienza la pagination
  const totalPages = ref(0);//numero de paginas 
  const perPage = ref(0)
   // =======================> SETTERS
  const setUserList = async () => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const { paginatedData } = await userListService(page.value.toString());
      if(paginatedData){
        userActualList.value = paginatedData.users;
        page.value = paginatedData.paginator.currentPage;
        totalPages.value = paginatedData.paginator.totalPages;
        perPage.value = paginatedData.paginator.perPage;
        // console.log(paginatedData);
      }else  return "500";
  }

  const NextPage = () => {
    page.value = page.value + 1;

  }

  const PrevPage = () => {
      page.value = page.value - 1;
  }
  // =======================> GETTERS

  
  return {
    userActualList,
    page,
    totalPages,
    perPage,
    setUserList,
    NextPage,
    PrevPage,
    getUserList: computed(() => userActualList.value),
    getPerPages:computed(() => perPage.value),
    getTotalPages: computed(() => totalPages.value)
  }
});