import  AxiosInstance  from "@/api/axios"

export const getCategoriesService = async () =>{
  try{

    const response = await AxiosInstance.get('/categories/getAll');
    return response.data;

  }catch(e){
    return e
    
  }
}