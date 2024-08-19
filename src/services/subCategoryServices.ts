import  AxiosInstance  from "@/api/axios"

export const getSubCategoriesService = async () =>{
  try{

    const response = await AxiosInstance.get('/subCategories/getAll');
    return response.data;

  }catch(e){
    return e
    
  }
}