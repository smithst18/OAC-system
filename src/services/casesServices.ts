import  AxiosInstance  from "@/api/axios"

export const saveCaseService = async ( form : object ) =>{
  try{

    const response = await AxiosInstance.post('/cases/save',form);
    return response.data;

  }catch(e){
    return e
    
  }
}