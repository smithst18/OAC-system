import  AxiosInstance  from "@/api/axios"

export const saveDiaryService = async ( form: object ) =>{
  try{

    const response = await AxiosInstance.post(`/diary/save`,form);
    return response.data;

  }catch(e){
    return e
    
  }
}


export const getDiariesService = async (id: string) =>{
  try{

    const response = await AxiosInstance.get(`/diary/getByCaseId/${id}`);
    return response.data;

  }catch(e){
    return e
    
  }
}
