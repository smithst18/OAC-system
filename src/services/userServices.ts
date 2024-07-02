import  AxiosInstance  from "@/api/axios"
// import { type AxiosResponse, type AxiosError } from "axios";

export const logInService = async ( form: object ) =>{
  try{

    const response = await AxiosInstance.post('/user/login',form);
    return response.data;

  }catch(e){
    return e
    
  }
}

export const signUpService = async ( form: object ) =>{
  try{

    const response = await AxiosInstance.post('/user/signup',form);
    return response.data;

  }catch(e){
    return e
  }
}