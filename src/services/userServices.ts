import { AxiosInstance } from "@/api/axios"

export const logInService = async ( form: object ) =>{
  const data = await AxiosInstance.get('/user/login');
  return data;
}