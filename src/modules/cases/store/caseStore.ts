import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { saveCaseService, getCasesService, getSpecificCaseService, updateCaseService, StatisticsService  } from '@/services/casesServices';
import type { Case } from '@/interfaces/caseInterface';
import { useMainStore } from '@/stores/mainStore';

export const useCaseStore = defineStore('case', () => {

  // =======================> STATE
  const caseActualList = ref([]); //lista de usuarios
  const caseById = ref<Case>({
    _id:"",
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
    categoriaId:"",
    subCategoriaId:"",
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
  const page = ref(0); // pagina en la que comienza la pagination
  const totalPages = ref(0); //numero de paginas 
  const perPage = ref(0)
  const mainStore = useMainStore();

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

  const setCaseList = async (search?:string) => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const { paginatedData } = await getCasesService(page.value.toString(),search);
    if(paginatedData && paginatedData.paginator && paginatedData.cases.length > 0){
      
      caseActualList.value = paginatedData.cases;
      page.value = paginatedData.paginator.currentPage;
      totalPages.value = paginatedData.paginator.totalPages;
      perPage.value = paginatedData.paginator.perPage;
      return "200"
    }else  return "500";
  }

  const setCaseById = async (id : string) =>{
    const { Case } = await getSpecificCaseService(id);
    if(Case){
      
      caseById.value = Case;
      return "200"
    }else  return "500";
  }

  const saveCase = async (form : object) => {

    const data = await saveCaseService(form);

    if(data.savedCase){
      return "200";
    }
    else if(data.response){ 
      mainStore.changeRequestStatus(false)
      return "403"
    }
    else{
      mainStore.changeRequestStatus(false)
      return "500";
    };
  }

  const updateCase = async (form : object) => {

    const data = await updateCaseService(form);
    if(data.updatedCase){
      return "200";
    }
    else if(data.response){ 
      mainStore.changeRequestStatus(false);
      return "403"
    }
    else{
      mainStore.changeRequestStatus(false);
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
      mainStore.changeRequestStatus(false);
      return "403"
    }
    else{
      mainStore.changeRequestStatus(false);
      return "500"
    };
  }

  const NextPage = () => {
    page.value = page.value + 1;

  }

  const PrevPage = () => {
    page.value = page.value - 1;
  }
  
  const  $reset = () => {
     caseActualList.value = [];//lista de usuarios
     caseById.value = {
      _id:"",
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
      categoriaId:"",
      subCategoriaId:"",
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
    page.value = 0;// pagina en la que comienza la pagination
    totalPages.value = 0;//numero de paginas 
    perPage.value = 0;
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
  }
  // =======================> GETTERS
  const getCaseList = computed(() => {
    let cases = caseActualList.value.map(( elm:Case ) => {
      return {
        ...elm,
        analistaId:elm.analistaId.name
      }
    })
    return cases
  });

  const getCaseById = computed(() => {
    
    let caseData: Case =  {
      ...caseById.value,
      createdAt: new Date(caseById.value.createdAt).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).toString(),
      updatedAt:new Date(caseById.value.updatedAt).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).toString(),
      analistaId:caseById.value.analistaId.name,
      categoriaId:caseById.value.categoriaId._id,
      subCategoriaId:caseById.value.subCategoriaId._id,
    }
    return caseData
  });

  const getTotalCases = computed(() => {
    if(quantityPerCategory.value.counts.length > 0){
      return quantityPerCategory.value.counts.reduce((acumulador, valorActual) => {
        return acumulador + valorActual;
      }, 0);
    }else return 0
  });

  return {
    caseActualList,
    page,
    totalPages,
    perPage,
    caseById,
    closedCasesChart,
    setCaseList,
    setCaseById,
    saveCase,
    updateCase,
    setGeneralStatistics,
    NextPage,
    PrevPage,
    getCaseList,
    getPerPages:computed(() => perPage.value),
    getTotalPages: computed(() => totalPages.value),
    getClosedCasesChart:computed(() => closedCasesChart.value),
    getOpenCasesChart:computed(() => openCasesChart.value),
    getOnProcessCasesChart:computed(() => onProcessCasesChart.value),
    getQuantityPerCategory: computed(() => quantityPerCategory.value),
    getTotalCases,
    getCaseById,
    $reset
  }
});