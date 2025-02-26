import  AxiosInstance  from "@/api/axios"

export const saveDiaryService = async ( form: object ) =>{
  try{

    const response = await AxiosInstance.post(`/diary/save`,form);
    return response.data;

  }catch(e){
    return e
    
  }
}


export const getDiariesService = async (caseId: string) =>{
  try{

    const response = await AxiosInstance.get(`/diary/getByCaseId/${caseId}`);
    return response.data;

  }catch(e){
    return e
    
  }
}

export const downloadCaseDiary = async (caseId:string) =>{
  try{

    const response = await AxiosInstance.get(`/diary/generateFileOneCase/${caseId}`, { responseType: 'arraybuffer' });
    return response;

  }catch(e){
    return e
    
  }
}
