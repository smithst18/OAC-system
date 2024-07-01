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
  const isLoged = ref<boolean>(false);
  const logedUser = ref<User | any>({
    name:'',
    ci:'',
    rol:'',
  });

  const requestIsLoading = ref(false);
  // =======================================> GETTERS

  // =======================================> ACTIONS
  const logIn = async ( form : object ) => {

    const response = await logInService(form);
    if(response.token) {
      //save the token in the cookies for the axios interceptor
      cookies.set('token', response.token, 60*60*12);
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
    else if(response.response) {
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

    isLoged.value = false;
    logedUser.value = {};
    cookies.remove('user')
    cookies.remove('token');
    router.push({ name:'login' });
  }

  // autoinvoqued functions 
  //this function have to validate if the token exp is valid then it would save the cookies data in the state of the store 

  (function () {
    const user = cookies.get('user');

    if(user && user != null && user != undefined){
      logedUser.value = user;
      isLoged.value = true;
    }
  })();
  
  return { logedUser,isLoged,requestIsLoading, logIn,logOut }
})
