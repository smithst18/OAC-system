import  AxiosInstance  from "@/api/axios"

export const getsubcategoriesService = async (id:String) =>{
  try{

    const response = await AxiosInstance.get(`/subcategories/getAllByCategory/${id}`);
    return response.data;

  }catch(e){
    return e
    
  }
}