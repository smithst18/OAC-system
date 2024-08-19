import  AxiosInstance  from "@/api/axios"

export const getTypesService = async (id:String) =>{
  try{

    const response = await AxiosInstance.get(`/types/getAllBySubcategory/${id}`);
    return response.data;

  }catch(e){
    return e
    
  }
}