import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logInService,signUpService } from "@/services/userServices";
import { useCookies } from "vue3-cookies";
import type {  User } from '@/interfaces/userInterfaces';
import { useRouter } from 'vue-router';

export const useMainStore = defineStore('main', () => {
  // =======================================> STATES
  const router = useRouter();
  const { cookies } = useCookies();
  const isLoged = ref<boolean>(false);
  const logedUser = ref<User | any>({
    id:'',
    name:'',
    ci:'',
    rol:'',
  });

  const requestIsLoading = ref(false);
  // =======================================> GETTERS

  // =======================================> ACTIONS
  const logIn = async ( form : object ) => {

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
      //set spinner in loggin vue to false
      requestIsLoading.value = false;
      return "500";
    }
  }

  const logOut = () => {
    $reset();
    router.push({ name:'login' });
  }

  const signUp = async (form:object) =>{

    const data = await signUpService(form);
    if(data.savedUser) return "200";
    else if(data.response){ 
      requestIsLoading.value = false
      return "403"
    }
    else{
      requestIsLoading.value = false
      return "500";
    };

  }

  const changeRequestStatus  = (value:boolean) => {
    requestIsLoading.value = value;
  } 

  // autoinvoqued functions 
  //this function have to validate if the token exp is valid then it would save the cookies data in the state of the store 
  //fuction for reset the store
  const  $reset = () => {
    isLoged.value = false;
    logedUser.value = {
      name:'',
      ci:'',
      rol:'',
    };
    cookies.remove('user')
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
    logIn,
    logOut,
    signUp, 
    $reset,
    changeRequestStatus
  }
})
