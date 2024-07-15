import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { updateUserService, userListService, deleteUserService } from '@/services/userServices';

export const useUserStore = defineStore('user', () => {

  // =======================> STATE
  const userActualList = ref([]);//lista de usuarios
  const page = ref(0);// pagina en la que comienza la pagination
  const totalPages = ref(0);//numero de paginas 
  const perPage = ref(0)
   // =======================> SETTERS
  const setUserList = async () => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const { paginatedData } = await userListService(page.value.toString());
      if(paginatedData && paginatedData.paginator){
        userActualList.value = paginatedData.users;
        page.value = paginatedData.paginator.currentPage;
        totalPages.value = paginatedData.paginator.totalPages;
        perPage.value = paginatedData.paginator.perPage;
        console.log(paginatedData);
        return "200"
      }else  return "500";
  }

  const updateUser = async (userId:object) => {

    const data  = await updateUserService(userId);
    if(data.updatedUser) {
      setUserList()
      return '200'
    }
    //goint this bloq if user error
    else if(data.response) {
      
      return '403';
    }
    //goint this bloq if server error
    else {
      
      return "500";
    }
    
  }

  const deleteUser = async (userId:string) => {

    const data  = await deleteUserService(userId);
    if(data.deletedUser) {
      setUserList();
      return '200';
    }
    //goint this bloq if user error
    else if(data.response) {
      
      return '403';
    }
    //goint this bloq if server error
    else {
      
      return "500";
    }
    
  }

  const NextPage = () => {
    console.log(page.value)
    page.value = page.value + 1;

  }

  const PrevPage = () => {
    console.log(page.value)
    page.value = page.value - 1;
  }
  // =======================> GETTERS

  
  return {
    userActualList,
    page,
    totalPages,
    perPage,
    setUserList,
    updateUser,
    deleteUser,
    NextPage,
    PrevPage,
    getUserList: computed(() => userActualList.value),
    getPerPages:computed(() => perPage.value),
    getTotalPages: computed(() => totalPages.value)
  }
});