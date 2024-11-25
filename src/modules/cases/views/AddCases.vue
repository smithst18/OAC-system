<script setup lang="ts">
  import { useMainStore } from '@/stores/mainStore';
  import { useCaseStore } from "@/modules/cases/store/caseStore";
  import { useToast } from '@/composables/useToast';
  import { ref, defineAsyncComponent, onMounted, watch } from 'vue';
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';
  import { listEstados, listMunicipios } from "@/services/DTPservices";
  import { getSubCategoriesService } from "@/services/subCategoryServices"; 
  import { getTypesService } from "@/services/typesServices"; 
  import type { subCategory } from "@/interfaces/categoryInterface";
  import type { Entity } from "@/interfaces/Entity";
  import type { SelectFieldI } from "@/interfaces/selecFieldInterface";

  
  const MainForm = defineAsyncComponent(() => import('@/components/Form/MainForm.vue'));
  const InputField = defineAsyncComponent(() => import('@/components/Form/InputField.vue'));
  const SelectField = defineAsyncComponent(() => import('@/components/Form/SelectField.vue'));
  const TextareaField = defineAsyncComponent(() => import('@/components/Form/TextareaField.vue'));
  const FileInput = defineAsyncComponent(() => import('@/components/commons/FileInput.vue'));
  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
  
  const { values, errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
      subId: yup.number().required('ID es requerido').positive('debe ser positivo').integer('debe ser un entero'),
      fechaDeApertura: yup .date().required('fecha de apertura es requerido'),
      remitente: yup.string().required('Remitente es requerido').trim(),
      nombreSolicitante: yup .string().required('Nombre del Solicitante es requerido').trim(),
      cedulaSolicitante: yup .string().required('Cedula del Solicitante es requerido').trim(),
      nombreBeneficiario: yup .string().required('Nombre del Beneficiario es requerido').trim(),
      cedulaBeneficiario: yup .string().required('Cedula del Beneficiario es requerido').trim(),
      telefonoBeneficiario: yup .string().required('Telefono del Beneficiario es requerido').trim(),
      edad: yup.number().required('Edad es requerido').max(110, "No debe exceder los 110"),
      genero:yup.string().required('Genero es requerido').trim(),
      estado:yup.string().required('Estado es requerido').trim(),
      municipio:yup.string().required('Municipio es requerido').trim(),
      parroquia: yup .string().required('Parroquia es requerido').trim(),
      sector: yup .string().required('Sector es requerido').trim(),
      tipoBeneficiario: yup .string().required('Tipo de Beneficiario es requerido').trim(),
      categoria: yup .string().required('Categoria es requerido').trim(),
      subCategoriaId: yup .string().required('subcategoria es requerido').trim(),
      tipoId: yup .string().required('Tipo es requerido').trim(),
      prioridad: yup .string().required('prioridad es requerido').trim(),
      descripcion: yup.string().trim().max(300, "Máximo 300 caracteres").required('Descripción es requerida'),
    }),
  });
  
  const mainStore = useMainStore();
  const caseStore = useCaseStore();
  const { successToast, errorToast } = useToast();

  const [subId] = defineField('subId');
  const [fechaDeApertura] = defineField('fechaDeApertura');
  const [remitente] = defineField('remitente');
  const [nombreSolicitante] = defineField('nombreSolicitante');
  const [cedulaSolicitante] = defineField('cedulaSolicitante');
  const [nombreBeneficiario] = defineField('nombreBeneficiario');
  const [cedulaBeneficiario] = defineField('cedulaBeneficiario');
  const [telefonoBeneficiario] = defineField('telefonoBeneficiario');
  const [edad] = defineField('edad');
  const [genero] = defineField('genero');
  const [estado] = defineField('estado');
  const [municipio] = defineField('municipio');
  const [parroquia] = defineField('parroquia');
  const [sector] = defineField('sector');
  const [tipoBeneficiario] = defineField('tipoBeneficiario');
  const [categoria] = defineField('categoria');
  const [subCategoriaId] = defineField('subCategoriaId');
  const [tipoId] = defineField('tipoId');
  const [prioridad] = defineField('prioridad');
  const [descripcion] = defineField('descripcion');

  const file = ref<File | null>(null);
  const estados = ref<Entity[]>([]);
  const estadosSelectList = ref<SelectFieldI[]>([]);
  const municipioList = ref<SelectFieldI[]>([]);
  const subCategoriesSelectList = ref<SelectFieldI[]>([]);
  const typesList = ref<SelectFieldI[]>([]);

  //LIST FOR DESPLEGABLESA
  const remitenteListOptions = [
    {label:"oficina de atencion al ciudadano",value:"O.A.C"},
    {label:"ministro",value:"ministro"},
    {label:"viceministerios",value:"viceministerios"},
    {label:"sala situacional",value:"sala situacional"},
    {label:"entes adscritos",value:"entes adscritos"},
    {label:"gabinete ministerial",value:"gabinete ministerial"},
    {label:"abordaje territorial",value:"abordaje territorial"},
    {label:"venapp",value:"venapp"},
    {label:"institucion",value:"institucion"},
  ];

  const generoListOptions = [{label:"masculino",value:"M"}, {label:"femenino",value:"M"}];

  const tipoBeneficiarioListOptions = [
    {label:"conppa",value:"CONPPA"},
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
    {label:"urgente-importante",value:"urgente-importante"},
    {label:"urgente-no Importante",value:"urgente-noImportante"},
    {label:"no urgente-importante",value:"noUrgente-importante"},
    {label:"no Urgente-no Importante",value:"noUrgente-noImportante"},
  ];

  //watcher para setear las sub categorias / y municipios

  const updateMunicipios = async (estado: string) => {
    if (!estado || !estados.value.length) return;

    const estadoId = estados.value.find(elm => elm.toponymName === estado)?.geonameId || 0;
    const { geonames } = await listMunicipios(estadoId);

    municipioList.value = geonames.map((elm: Entity) => ({ label: elm.toponymName, value: elm.toponymName }));
    parroquia.value = '';
  };

  watch(() => values.estado, updateMunicipios);
  
  const updateSubcategory = async (subCategoriaId : string) => {
      if(subCategoriaId && subCategoriesSelectList.value.length > 0){
        
        const  { typesByCategory } = await getTypesService(subCategoriaId);

        if(typesByCategory) typesList.value = typesByCategory.map((elm: subCategory) => ({ label: elm.name, value: elm._id }));
        
        else{
          console.log("error seteando los tipos revizar respuesta");
        }
      }
    }
    
  watch( () => values.subCategoriaId,updateSubcategory);

  const onSubmit = handleSubmit(async (values) => {
    let fileToSend = undefined;
    
    if(file.value != undefined) fileToSend = file.value;
    // se hace una busqueda por id en el array debido a que el value en el formulario se vuelve temporalmente un numero
    let formulary = {
      ...values,
      analistaId: mainStore.logedUser.id,
      casoPdf:fileToSend
    } 

    const resp = await caseStore.saveCase(formulary);
    
    if(resp == '200') {
      successToast("Caso guardado de manera correcta");
      resetForm();
      file.value = null;
    }
    else if(resp == '400') errorToast("Ya existe un caso con el Id elegido")
    else if(resp == '403') errorToast("Error al guardar caso verifique info")
    else errorToast("Error de servidor");
  });
  

  onMounted(async () => {
   try {
      const response = await listEstados();
      if (response && response.geonames && Array.isArray(response.geonames)) {
        estados.value = response.geonames;
        estadosSelectList.value = response.geonames.map((elm: Entity) => ({ label: elm.toponymName, value: elm.toponymName }));
      } else {
        throw new Error("Formato de datos inválido");
      }
    } catch (error) {
      errorToast("Error al cargar los estados");
      console.error(error);
    };

   try {
      const response = await getSubCategoriesService();
      if (response && response.subcategories && Array.isArray(response.subcategories)) {

        subCategoriesSelectList.value = response.subcategories.map((elm: subCategory) => ({ label: elm.name, value: elm._id }));

      } else {
        throw new Error("Formato de datos inválido");
      }
    } catch (error) {
      errorToast("Error al cargar los estados");
      console.error(error);
    };
  });
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
        <div class="w-full h-full  px-10 py-5 rounded-2xl shadow-md bg-cyan-50 border border-cyan-500 overflow-auto">
            <h1 class="text-2xl font-semibold text-center my-5 text-primary opacity-70">Agregar nuevo caso</h1>
            <MainForm @submit="onSubmit" :cols="3" class="!h-[90%]">
              <template v-slot:content>
                <InputField v-model="subId"  type="number" name="subId" autocomplete="subId"  label="ID" :error="errors.subId"/>
                <InputField v-model="fechaDeApertura"  type="date" name="fechaDeApertura" autocomplete="fechaDeApertura"  label="fecha De Apertura" :error="errors.fechaDeApertura"/>
                <SelectField v-model="remitente" name="remitente"  label="remitente" :error="errors.remitente" :options="remitenteListOptions" />
                <InputField v-model="nombreSolicitante"  type="text" name="nombreSolicitante" autocomplete="nombreSolicitante"  label="nombre del solicitante" :error="errors.nombreSolicitante"/>
                <InputField v-model="cedulaSolicitante"  type="text" name="cedulaSolicitante" autocomplete="cedulaSolicitante"  label="cedula del solicitante" :error="errors.cedulaSolicitante"/>
                <InputField v-model="nombreBeneficiario"  type="text" name="nombreBeneficiario" autocomplete="nombreBeneficiario"  label="nombre del beneficiario" :error="errors.nombreBeneficiario"/>
                <InputField v-model="cedulaBeneficiario"  type="text" name="cedulaBeneficiario" autocomplete="cedulaBeneficiario"  label="cedula del beneficiario" :error="errors.cedulaBeneficiario"/>
                <InputField v-model="telefonoBeneficiario"  type="text" name="telefonoBeneficiario" autocomplete="telefonoBeneficiario"  label="telefono del beneficiario" :error="errors.telefonoBeneficiario"/>
                <InputField v-model="edad"  type="number" name="edad" autocomplete="edad"  label="edad" :error="errors.edad"/>
                <SelectField v-model="genero" name="genero"  label="genero" :error="errors.genero" :options="generoListOptions"/>
                <SelectField v-model="estado" name="estado"  label="Estado" :error="errors.estado" :options="estadosSelectList" />
                <SelectField v-model="municipio" name="municipio"  label="municipio" :error="errors.municipio" :options="municipioList" />
                <InputField v-model="parroquia"  type="text" name="parroquia" autocomplete="parroquia"  label="parroquia" :error="errors.parroquia"/>
                <InputField v-model="sector"  type="text" name="sector" autocomplete="sector"  label="sector" :error="errors.sector"/>
                <SelectField v-model="tipoBeneficiario" name="tipoBeneficiario"  label="tipo de beneficiario" :error="errors.tipoBeneficiario" :options="tipoBeneficiarioListOptions" />
                <SelectField v-model="categoria" name="categoria"  label="categoria" :error="errors.categoria" :options="categoriaListOptions" />
                <SelectField v-model="subCategoriaId" name="subCategoriaId"  label="subcategoria" :error="errors.subCategoriaId" :options="subCategoriesSelectList" />
                <SelectField v-model="tipoId" name="tipoId"  label="tipo" :error="errors.tipoId" :options="typesList" />
                <SelectField v-model="prioridad" name="prioridad"  label="prioridad" :error="errors.prioridad" :options="prioridadListOptions" />
                <TextareaField v-model="descripcion" name="descripcion"  label="descripcion" autocomplete="descripcion" :rows="1" :cols="5" :error="errors.descripcion" />
                <FileInput :title="file?.name || 'Ningún archivo seleccionado'" :allowed-extensions="['pdf']" @send-file="(event:File) => file= event"/>
                <submitButton :full-size="true" title="Agregar" class="col-span-3 text-center my-5 mb-auto !p-3">
                  <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
                </submitButton>
              </template>
            </MainForm>
        </div>
  </div>
</template>
 
<style scoped lang="scss">
</style>