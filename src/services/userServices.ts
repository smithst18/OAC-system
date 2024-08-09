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


export const userListService = async (page:String) =>{
  try{

    const response = await AxiosInstance.get(`/user/getusers/${page}`);
    return response.data;

  }catch(e){
    return e
  }
}


export const updateUserService = async (form: object) => {
  try {
    const response = await AxiosInstance.put('/user/updateUser', form);
    return response.data;
  } catch (e) {
    return e
    // if (error.response) {
    //   // Respuesta con código de estado diferente de 2xx
    //   console.error('Error de respuesta:', error.response.data);
    // } else if (error.request) {
    //   // No se recibió respuesta del servidor
    //   console.error('No se pudo conectar al servidor:', error.request);
    // } else {
    //   // Otro tipo de error
    //   console.error('Error inesperado:', error.message);
    // }
    // throw new Error('Error al actualizar el usuario');
  }
};


export const deleteUserService = async (_id: string) => {
  try {
    const response = await AxiosInstance.put('/user/delete', {_id});
    return response.data;
  } catch (e) {
    return e
  }
};