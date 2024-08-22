import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { 
  saveCaseService,
  getCasesService, 
  getSpecificCaseService, 
  updateCaseService, 
  StatisticsService  
} from '@/services/casesServices';
import {
  getDiariesService,
  saveDiaryService
} from "@/services/diaryServices";
import type { Case } from '@/interfaces/caseInterface';
import { useMainStore } from '@/stores/mainStore';

export const useCaseStore = defineStore('case', () => {
  const mainStore = useMainStore();
  // =======================> STATE
  const caseActualList = ref([]); //lista de usuarios
  const caseDiaryList = ref<any>([]); //lista de usuarios
  const caseById = ref<Case>({
    _id:"",
    subId:0,
    remitente:"O.A.C",
    nombreSolicitante:"",
    cedulaSolicitante:"",
    nombreBeneficiario:"",
    cedulaBeneficiario:"",
    telefonoBeneficiario:"",
    edad:"",
    genero:"",
    estado:"",
    municipio:"",
    parroquia:"",
    sector:"",
    tipoBeneficiario:"",
    categoria:"peticion",
    subCategoriaId:"",
    tipoId:"",
    prioridad:"",
    status:"",
    fechaRedireccion:"",
    viaResolucion:"",
    enteRedireccionado:"",
    analistaId:"",
    diario:"",
    createdAt:"",
    updatedAt:"",
  });
  

  const closedCasesChart =  ref<{ counts: number[]; labels: string[] }>({
    counts: [],
    labels: [],
  });

  const openCasesChart =  ref<{ counts: number[]; labels: string[] }>({
    counts: [],
    labels: [],
  });

  const onProcessCasesChart =  ref<{ counts: number[]; labels: string[] }>({
    counts: [],
    labels: [],
  });

  const quantityPerCategory =  ref<{ counts: number[]; labels: string[] }>({
    counts: [],
    labels: [],
  });
  // =======================> SETTERS

  const setCaseList = async (search?:string): Promise<string> => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const { paginatedData } = await getCasesService(mainStore.getPage.toString(),mainStore.logedUser.id,search);
    if(paginatedData && paginatedData.cases.length > 0){

      if(!paginatedData.paginator) mainStore.showPagination = false;
      else{
        mainStore.showPagination = true;
        mainStore.setPage(paginatedData.paginator.currentPage);
        mainStore.setPerPages(paginatedData.paginator.perPage);
        mainStore.setTotalPages(paginatedData.paginator.totalPages);
      }

      caseActualList.value = paginatedData.cases;
      return "200"
    }else  return "500";
  }

  const setDiaryCaseList = async (id:string) => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const { diaries, response } = await getDiariesService(id);

    if(diaries && diaries.length > 0){
      
      caseDiaryList.value = diaries;
      return "200"
    }else if(response) return "404" ;
    else return "500";
  }
  
  const saveDiary = async (form : object) => {

    const { savedDiary, response } = await saveDiaryService(form);

    if(savedDiary){
      caseDiaryList.value.push(savedDiary);
      return "200";
    }
    else if(response){ 
      return "403"
    }
    else{
      return "500";
    };
  }

  const setCaseById = async (id : string) =>{
    const { foundCase } = await getSpecificCaseService(id);

    if(foundCase){
      
      caseById.value = foundCase;
      return "200"
    }else  return "500";
  }

  const saveCase = async (form : object) => {

    const data = await saveCaseService(form);

    if(data.savedCase){
      return "200";
    }
    else if(data.response){ 
      // mainStore.changeRequestStatus(false)
      return "403"
    }
    else{
      // mainStore.changeRequestStatus(false)
      return "500";
    };
  }

  const updateCase = async (form : object) => {

    const data = await updateCaseService(form);
    if(data.updatedCase){
      return "200";
    }
    else if(data.response){ 
      // mainStore.changeRequestStatus(false);
      return "403"
    }
    else{
      // mainStore.changeRequestStatus(false);
      return "500";
    };
  }

  const setGeneralStatistics =  async () => {
    const {closedCasesPerMonth, onprocessCasesPerMonth, openCasesPerMonth, quantityPerCategoryValues, response} = await StatisticsService();

    if(closedCasesPerMonth){
      closedCasesChart.value.counts = closedCasesPerMonth.counts;
      closedCasesChart.value.labels = closedCasesPerMonth.months;

      openCasesChart.value.counts = openCasesPerMonth.counts;
      openCasesChart.value.labels = openCasesPerMonth.months;

      onProcessCasesChart.value.counts = onprocessCasesPerMonth.counts;
      onProcessCasesChart.value.labels = onprocessCasesPerMonth.months;

      quantityPerCategory.value.counts =  quantityPerCategoryValues.counts
      quantityPerCategory.value.labels = quantityPerCategoryValues.categories
      console.log(quantityPerCategoryValues)
      return "200"
    }
    else if(response){ 
      // mainStore.changeRequestStatus(false);
      return "403"
    }
    else{
      // mainStore.changeRequestStatus(false);
      return "500"
    };
  }
  
  const  $reset = () => {
     caseActualList.value = [];//lista de usuarios
     caseById.value = {
      _id:"",
      subId:0,
      remitente:"O.A.C",
      nombreSolicitante:"",
      cedulaSolicitante:"",
      nombreBeneficiario:"",
      cedulaBeneficiario:"",
      telefonoBeneficiario:"",
      edad:"",
      genero:"",
      estado:"",
      municipio:"",
      parroquia:"",
      sector:"",
      tipoBeneficiario:"",
      categoria:"peticion",
      subCategoriaId:"",
      tipoId:"",
      prioridad:"",
      status:"",
      fechaRedireccion:"",
      viaResolucion:"",
      enteRedireccionado:"",
      analistaId:"",
      diario:"",
      createdAt:"",
      updatedAt:"",
    };
    closedCasesChart.value = {
      counts: [],
      labels: [],
    };
    openCasesChart.value = {
       counts: [],
      labels: [],
    };
    onProcessCasesChart.value ={
      counts: [],
      labels: [],
    };
    quantityPerCategory.value ={
      counts: [],
      labels: [],
    };
    caseDiaryList.value = [];
  }
  // =======================> GETTERS
  const getCaseList = computed(() => {
    let cases = caseActualList.value.map(( elm:Case ) => {
      return {
        id:elm.subId,
        remitente:elm.remitente,
        cedulaBeneficiario:elm.cedulaBeneficiario,
        prioridad:elm.prioridad,
        status:elm.status,
        analistaId:elm.analistaId.name,
      }
    })
    return cases
  });

  const getCaseById = computed(() => {
    
    let caseData: Case =  {
      ...caseById.value,
      createdAt: new Date(caseById.value.createdAt).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).toString(),
      updatedAt:new Date(caseById.value.updatedAt).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).toString(),
      subCategoriaId:caseById.value.subCategoriaId._id,
      tipoId:caseById.value.tipoId._id
    }
    // if(caseById.value.tipoId) caseData.tipoId = caseById.value.tipoId._id;
    // else caseData.tipoId = '';

    return caseData
  });

  const getTotalCases = computed(() => {
    if(quantityPerCategory.value.counts.length > 0){
      return quantityPerCategory.value.counts.reduce((acumulador, valorActual) => {
        return acumulador + valorActual;
      }, 0);
    }else return 0
  });

  const getCaseDiaryList = computed(() => {
    let data = caseDiaryList.value.map((elm:any) => {
      return { 
        ...elm,
        createdAt: new Date(elm.createdAt).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).toString()
      }
      
    })
    return data
  });

  return {
    caseActualList,
    caseById,
    closedCasesChart,
    caseDiaryList,
    setCaseList,
    setCaseById,
    saveCase,
    updateCase,
    setGeneralStatistics,
    setDiaryCaseList,
    saveDiary,
    getCaseList,
    getClosedCasesChart:computed(() => closedCasesChart.value),
    getOpenCasesChart:computed(() => openCasesChart.value),
    getOnProcessCasesChart:computed(() => onProcessCasesChart.value),
    getquantityPerCategory: computed(() => quantityPerCategory.value),
    getCaseDiaryList,
    getTotalCases,
    getCaseById,
    $reset
  }
});