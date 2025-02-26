import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { 
  saveCaseService,
  getCasesService, 
  getSpecificCaseService,
  updateCaseService, 
  StatisticsService,
  getCasesByReport
} from '@/services/casesServices';
import {
  getDiariesService,
  saveDiaryService
} from "@/services/diaryServices";
import type { Case } from '@/interfaces/caseInterface';
import { useMainStore } from '@/stores/mainStore';
import type { Diary } from '@/interfaces/diaryInterface';
import type { FilterI } from '@/interfaces/filterInterface';

export const useCaseStore = defineStore('case', () => {
  const mainStore = useMainStore();
  // =======================> STATE
  const caseActualList = ref([]); //lista de usuarios
  const caseDiaryList = ref<Diary[]>([]); //lista de usuarios
  const caseById = ref<Case>({
    _id:"",
    subId:0,
    remitente:"O.A.C",
    nombreSolicitante:"",
    cedulaSolicitante:"",
    nombreBeneficiario:"",
    cedulaBeneficiario:"",
    telefonoBeneficiario:"",
    edad:0,
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
    descripcion:"",
    file:"",
    fechaDeApertura:"",
    createdAt:"",
    updatedAt:"",
  });

  const remitenteListOptions = [
    {label:"oficina de atencion al ciudadano",value:"O.A.C"},
    {label:"ministro",value:"ministro"},
    {label:"viceministerios",value:"viceministerios"},
    {label:"sala situacional",value:"sala situacional"},
    {label:"corpesca",value:"corpesca"},
    {label:"insopesca",value:"insopesca"},
    {label:"pescalba",value:"pescalba"},
    {label:"cenipa",value:"cenipa"},
    {label:"fonpesca",value:"fonpesca"},
    {label:"conppa",value:"conppa"},
    {label:"gabinete ministerial",value:"gabinete ministerial"},
    {label:"abordaje territorial",value:"abordaje territorial"},
    {label:"venapp",value:"venapp"},
    {label:"institucion",value:"institucion"},
  ];
  const generoListOptions = [{label:"masculino",value:"M"}, {label:"femenino",value:"F"}];

  const tipoBeneficiarioListOptions = [
    {label:"CONPPA",value:"CONPPA"},
    {label:"pescador",value:"pescador"},
    {label:"acuicultor",value:"acuicultor"},
    {label:"particular",value:"particular"},
    {label:"institucional",value:"institucional"},
  ];
  const categoriaListOptions = [
    {label:"peticion",value:"peticion"},
    {label:"quejas",value:"quejas"},
    {label:"reclamo",value:"reclamo"},
    {label:"sugerencia",value:"sugerencia"},
    {label:"denuncia",value:"denuncia"},
  ];
  const prioridadListOptions = [
    {label:"Alta", value:"alta"},
    {label:"Media", value:"media"},
    {label:"Baja", value:"baja"},
  ];
  const viaResolucionListOptions = [
    {label:"tramitado",value:"tramitado"},
    {label:`servicio Desconcentrado “Fondo Negro Primero”`,value:"servicio desconcentrado fondo negro primero"},
    {label:"partida de donacion a tercero",value:"partida de donacion a tercero"},
    {label:"remitido al ente con competencia por la naturaleza del caso",value:"remitido al ente con competencia por la naturaleza del caso"},
    {label:"recursos propios",value:"recursos propios"},
    {label:"donacion",value:"donacion"},
    {label:"no procede",value:"no procede"},
  ];
  const statusListOptions = [
    {label:"contacto inicial",value:"contacto inicial"},
    {label:"conformacion del expediente",value:"conformacion del expediente"},
    {label:"proceso de analisis",value:"proceso de analisis"},
    {label:"notificacion al solicitante",value:"notificacion al solicitante"},
    {label:"proceso administrativo",value:"proceso administrativo"},
    {label:"seguimiento",value:"seguimiento"},
    {label:"cerrado",value:"cerrado"},
  ];

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
    const response = await getCasesService(mainStore.getPage.toString(),mainStore.logedUser.id,search);

    if(response.paginatedData && response.paginatedData.cases.length > 0){
      if(!response.paginatedData.paginator) mainStore.showPagination = false;
      else{
        mainStore.showPagination = true;
        mainStore.setPage(response.paginatedData.paginator.currentPage);
        mainStore.setPerPages(response.paginatedData.paginator.perPage);
        mainStore.setTotalPages(response.paginatedData.paginator.totalPages);
        mainStore.setTotalresults(response.paginatedData.paginator.totalDocs);
        mainStore.setPagingCounter(response.paginatedData.paginator.pagingCounter);

      }

      caseActualList.value = response.paginatedData.cases;
      return "200"
    }else if(response.response){
      return "404"
    } else return "500";
  }

  const setCaseListReport = async ( form:FilterI ): Promise<any> => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const response = await getCasesByReport(
      {
        ...form,
        startDate:encodeURIComponent(form.startDate),
        endDate:encodeURIComponent(form.endDate),
      },
      mainStore.logedUser.id,
      mainStore.getPage.toString());
      
    if(response.paginatedData && response.paginatedData.cases.length > 0){
      console.log(response)
      if(!response.paginatedData.paginator) mainStore.showPagination = false;
      else{
        mainStore.showPagination = true;
        mainStore.setPage(response.paginatedData.paginator.currentPage);
        mainStore.setPerPages(response.paginatedData.paginator.perPage);
        mainStore.setTotalPages(response.paginatedData.paginator.totalPages);
        mainStore.setTotalresults(response.paginatedData.paginator.totalDocs);
        
        caseActualList.value = response.paginatedData.cases;
        return "200"
      }
    }else if(response.response) return "404";
    else return "500";
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

  const setCaseById = async (id: string) =>{

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
    else if(data.response.data.code == 400) return "400"
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
      //seteamos el nuevo caso para que se refleje en los formularios
      caseById.value = data.updatedCase;
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
      edad:0,
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
      descripcion:"",
      file:"",
      fechaDeApertura:"",
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
    const cases = caseActualList.value.map(( elm:Case ) => {
      return {
        _id:elm._id,
        //id:elm.subId,
        cedula:elm.cedulaBeneficiario,
        estatus:elm.status,
        entidad:elm.estado,
        tipoSolicitud:elm.categoria,
      }
    })
    return cases
  });

  const getCaseById = computed(() => {
    // const userLocale = navigator.language;
    
    const caseData: Case =  {
      ...caseById.value,
      fechaDeApertura: caseById.value.fechaDeApertura ? new Date(caseById.value.fechaDeApertura).toISOString().split('T')[0] : '',
      updatedAt: caseById.value.updatedAt ? new Date(caseById.value.updatedAt).toISOString().split('T')[0] : '',
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
    const data = caseDiaryList.value.map((elm: Diary) => {
      return { 
        ...elm,
        createdAt: elm.createdAt ? 
          new Date(elm.createdAt).toLocaleString('es-ES', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          }).toString() 
          : 'Fecha no disponible' // Manejo de caso cuando createdAt es undefined
      };
    });
    return data;
  });
  
  return {
    caseActualList,
    caseById,
    closedCasesChart,
    caseDiaryList,
    remitenteListOptions,
    generoListOptions,
    tipoBeneficiarioListOptions,
    categoriaListOptions,
    prioridadListOptions,
    viaResolucionListOptions,
    statusListOptions,
    setCaseList,
    setCaseById,
    saveCase,
    updateCase,
    setGeneralStatistics,
    setDiaryCaseList,
    saveDiary,
    setCaseListReport,
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