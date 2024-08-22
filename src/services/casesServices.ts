import  AxiosInstance  from "@/api/axios"

export const saveCaseService = async ( form : object ) =>{
  try{

    const response = await AxiosInstance.post('/cases/save',form);
    return response.data;

  }catch(e){
    return e
    
  }
}


export const getCasesService = async ( page : String, userId:string, search? : string ) =>{
  try{
    
    const response = await AxiosInstance.get(`/cases/getcases/${page}/${userId}/${search}`);
    return response.data;

  }catch(e){
    return e
    
  }
}

export const getSpecificCaseService = async ( id : String ) =>{
  try{

    const response = await AxiosInstance.get(`/cases/getcaseById/${id}`);
    return response.data;

  }catch(e){
    return e
    
  }
}

export const updateCaseService = async ( form : object ) =>{
  try{

    const response = await AxiosInstance.put(`/cases/updateCaseById`,form);
    return response.data;

  }catch(e){
    return e
    
  }
}

export const StatisticsService = async () =>{
  try{

    const response = await AxiosInstance.get(`/cases/generalStaticsPerMonth`);
    return response.data;

  }catch(e){
    return e
    
  }
}


export const downloadCasesExcel = async () =>{
  try{

    const response = await AxiosInstance.get(`/cases/getCasesInExcel`, { responseType: 'blob' });
    return response;

  }catch(e){
    return e
    
  }
}

export const downloadCasesExcelById = async (id:string) =>{
  try{

    const response = await AxiosInstance.get(`/cases/generateExcelOneCase/${id}`, { responseType: 'arraybuffer' });
    return response;

  }catch(e){
    return e
    
  }
}