import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logInService } from "@/services/userServices";
import { useCookies } from "vue3-cookies";
import type {  User } from '@/interfaces/userInterfaces';
import { useRouter } from 'vue-router';

export const useMainStore = defineStore('main', () => {
  // =======================================> STATES
  const router = useRouter();
  const { cookies } = useCookies();
  //esta propiedad es usada para hacer las busquedas en el componente searchBar
  const search = ref('');
  const isLoged = ref<boolean>(false);
  const logedUser = ref<User | any>({
    id:'',
    name:'',
    ci:'',
    rol:'',
  });
  //propertys para las tablas y paginacion
  const page = ref(0); // pagina en la que comienza la pagination
  const totalPages = ref(0); //numero de paginas 
  const perPage = ref(0);
  const totalResults = ref(0);
  const showPagination = ref(true);
  const pagingCounter = ref(0);
  //properti para las resp 
  const requestIsLoading = ref(false);
  // =======================================> GETTERS

  // =======================================> ACTIONS
  const logIn = async ( form : object ) => {
    try{

      const data = await logInService(form);
      if(data.token) {
        //save the token in the cookies for the axios interceptor
        cookies.set('token', data.token, 60*60*12);
        //send the request again with the token in the header
        const payload = await logInService(form);
        // we get the payload of the user information and save it in the cookies for use it lately
        cookies.set('user', payload.user, 60*60*12);
        //redirect to home view
        logedUser.value = payload.user;
        isLoged.value = true;
        return '200'
      }
      //goint this bloq if user error
      else if(data.response) {
        //set spinner in loggin vue  to false
        requestIsLoading.value = false;
        return '400';
      }
      //goint this bloq if server error
      else {
        console.error(data)
        //set spinner in loggin vue to false
        requestIsLoading.value = false;
        return "500";
      }
    }catch(err){
      console.log(err);
    }
  }

  const logOut = () => {
    $reset();
    router.push({ name:'login' });
  }

  const changeRequestStatus  = (value:boolean) => {
    requestIsLoading.value = value;
  } 

  // autoinvoqued functions 
  //this function have to validate if the token exp is valid then it would save the cookies data in the state of the store 
  //fuction for reset the store

  const $resetPaginator = () =>{
    page.value = 0;// pagina en la que comienza la pagination
    totalPages.value = 0;//numero de paginas 
    perPage.value = 0;
  }

  const  $reset = () => {
    isLoged.value = false;
    logedUser.value = {
      name:'',
      ci:'',
      rol:'',
      id:'',
    };
    search.value = '';
    page.value = 0;// pagina en la que comienza la pagination
    totalPages.value = 0;//numero de paginas 
    perPage.value = 0;
    cookies.remove('user');
    cookies.remove('token');
  }

  (function () {
    const user = cookies.get('user');

    if(user && user != null && user != undefined){
      logedUser.value = user;
      isLoged.value = true;
    }
  })();
  
  return { 
    logedUser,
    isLoged,
    requestIsLoading, 
    search,
    showPagination,
    logIn,
    logOut,
    setRequestLoaderStatus: (value:boolean)=>  requestIsLoading.value = value,
    setPage: (value: number) => page.value = value, 
    setPerPages: (value: number) => perPage.value = value, 
    setTotalPages: (value: number) => totalPages.value = value, 
    setTotalresults: (value: number) => totalResults.value = value, 
    setPagingCounter: (value: number) => pagingCounter.value = value, 
    nextPage: () => page.value = page.value + 1,
    prevPage: () => page.value = page.value - 1,
    $reset,
    $resetPaginator,
    getPage:computed(() => page.value),
    getPerPages:computed(() => perPage.value),
    getTotalPages: computed(() => totalPages.value),
    getTotalResults: computed(() => totalResults.value),
    getPagingCounter: computed(() => pagingCounter.value),
    getSearch: computed(() => search.value),
    changeRequestStatus
  }
})
