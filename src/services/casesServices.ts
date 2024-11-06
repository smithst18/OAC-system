import  AxiosInstance  from "@/api/axios"
import type { FilterI } from "@/interfaces/filterInterface";

export const saveCaseService = async ( form : object ) =>{
  try{

    const response = await AxiosInstance.post('/cases/save',form ,{
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
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

export const getSpecificCaseService = async (caseId: string) => {
  try {
    if (caseId) {
      const response = await AxiosInstance.get(`/cases/getcaseById/${caseId}`);
      return response.data;
    } else {
      throw new Error("Debe proporcionar 'caseSubId' o 'id' para obtener un caso específico.");
    }
  } catch (e) {
    console.error("Error en getSpecificCaseService:", e);
    throw e; // Re-lanzamos el error para manejarlo desde el lugar donde se llama la función
  }
};

export const updateCaseService = async ( form : object ) =>{
  try{
    
    const response = await AxiosInstance.put(`/cases/updateCaseById`,form,{
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
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

export const downloadCasesExcelById = async (caseSubId:string) =>{
  try{
    
    const response = await AxiosInstance.get(`/cases/generateExcelOneCase/${caseSubId}`, { responseType: 'arraybuffer' });
    return response;
    
  }catch(e){
    return e
    
  }
}

export const downloadExcelClosedCase = async (caseSubId:string) =>{
  try{
    
    const response = await AxiosInstance.get(`/cases/generateExcelClosedCase/${caseSubId}`, { responseType: 'arraybuffer' });
    return response;
    
  }catch(e){
    return e
    
  }
}

export const getCasesByReport = async ( form : FilterI, userId : string, page : string) =>{
  try{
    
    const response = await AxiosInstance.get(`/cases/especificReport/${userId}/${form.field}/${form.fieldValue}/${form.startDate}/${form.endDate}/${page}`);
    return response.data;

  }catch(e){
    return e
    
  }
}