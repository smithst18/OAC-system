<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { useMainStore } from '@/stores/mainStore';
  import { useCaseStore } from "@/modules/cases/store/caseStore";
  import { useToast } from '@/composables/useToast';
  import { ref, defineAsyncComponent, onMounted, watch, computed, onUnmounted } from 'vue';
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';
  import { getSubCategoriesService } from "@/services/subCategoryServices"; 
  import { getTypesService } from "@/services/typesServices"; 
  import { listEstados, listMunicipios } from "@/services/DTPservices";
  import type { subCategory } from "@/interfaces/categoryInterface";
  import type { Case } from '@/interfaces/caseInterface';
  import type { Entity } from "@/interfaces/Entity";


  const props = defineProps<{
    caseById: Case
  }>();

  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const SubmitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));

  const { values, errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
      remitente: yup.string().required('remitente es requerido').trim(),
      nombreSolicitante: yup .string().required('nombre del Solicitante es requerido').trim(),
      cedulaSolicitante: yup .string().required('cedula del Solicitante es requerido').trim(),
      nombreBeneficiario: yup .string().required('nombre del Beneficiario es requerido').trim(),
      cedulaBeneficiario: yup .string().required('cedula del Beneficiario es requerido').trim(),
      telefonoBeneficiario: yup .string().required('edad es requerido').trim(),
      edad:yup.string().required('edad es requerido').trim(),
      genero:yup.string().required('genero es requerido').trim(),
      estado:yup.string().required('estado es requerido').trim(),
      municipio:yup.string().required('municipio es requerido').trim(),
      parroquia: yup .string().required('parroquia es requerido').trim(),
      sector: yup .string().required('sector es requerido').trim(),
      tipoBeneficiario: yup .string().required('tipo de Beneficiario es requerido').trim(),
      categoria: yup .string().required('categoria es requerido').trim(),
      subCategoriaId: yup .string().trim(),
      prioridad: yup .string().required('prioridad es requerido').trim(),
      viaResolucion: yup .string().trim().required('prioridad es requerido'),
      status: yup .string().required('status es requerido').trim(),
      enteRedireccionado: yup .string().trim(),
      descripcion: yup .string().trim().max(300,"max 300 caracteres").required('descripcion es requerido'),
    }),
  });
  
  const mainStore = useMainStore();
  const caseStore = useCaseStore();
  const toast = useToast();
  const rout =  useRoute();
  const caseId = computed(() => rout.params.id.toString());
  const caseIdShort = computed(() => caseId.value.substring(caseId.value.length - 5).toUpperCase());
  
  const [remitente,remitenteAttrs] = defineField('remitente');
  const [nombreSolicitante,nombreSolicitanteAttrs] = defineField('nombreSolicitante');
  const [cedulaSolicitante,cedulaSolicitanteAttrs] = defineField('cedulaSolicitante');
  const [nombreBeneficiario,nombreBeneficiarioAttrs] = defineField('nombreBeneficiario');
  const [cedulaBeneficiario,cedulaBeneficiarioAttrs] = defineField('cedulaBeneficiario');
  const [telefonoBeneficiario,telefonoBeneficiarioAttrs] = defineField('telefonoBeneficiario');
  const [edad,edadAttrs] = defineField('edad');
  const [genero,generoAttrs] = defineField('genero');
  const [estado,estadoAttrs] = defineField('estado');
  const [municipio,municipioAttrs] = defineField('municipio');
  const [parroquia,parroquiaAttrs] = defineField('parroquia');
  const [sector,sectorAttrs] = defineField('sector');
  const [tipoBeneficiario,tipoBeneficiarioAttrs] = defineField('tipoBeneficiario');
  const [categoria,categoriaAttrs] = defineField('categoria');
  const [subCategoriaId,subCategoriaAttrs] = defineField('subCategoriaId');
  const [tipoId,tipoAttrs] = defineField('tipoId');
  const [prioridad,prioridadAttrs] = defineField('prioridad');
  const [viaResolucion,viaResolucionAttrs] = defineField('viaResolucion');
  const [analistaId,analistaIdAttrs] = defineField('analistaId');
  const [descripcion,descripcionAttrs] = defineField('descripcion');

  const [status,statusAttrs] = defineField('status');
  const [enteRedireccionado,enteRedireccionadoAttrs] = defineField('enteRedireccionado');
  const [createdAt,createdAtAttrs] = defineField('createdAt');
  const [updatedAt,updatedAtAttrs] = defineField('updatedAt');

  const estadoList = ref<Entity[]>([]);
  const municipioList = ref<Entity[]>([]);
  const parroquiaList = ref<Entity[]>([]);
  const subCategoriesList = ref<subCategory[]>([]);
  const typesList = ref<subCategory[]>([]);

  watch(
    () => values.estado,
    async (estado) => {
      if (estado && estadoList.value.length > 0) {

        municipioList.value = [];
        parroquiaList.value = [];

        let estadoId = estadoList.value.find((elm) => {
          return elm.toponymName === estado;
        })?.geonameId || 0;

        const { geonames } = await listMunicipios(estadoId);

        if (geonames && geonames.length >= 1) {
          municipioList.value = geonames;
        } else console.log('No se pudieron setear los municipios');

      }
  });

  //watcher para setear las sub categorias.
  watch(
    () => values.subCategoriaId,
    async (subCategoriaId) => {
      if(subCategoriaId && subCategoriesList.value.length > 0){
        const  { typesByCategory } = await getTypesService(subCategoriaId);
        if(typesByCategory) typesList.value = typesByCategory;
        else{
          console.log("error seteando los tipos revizar respuesta");
        }
      }
  });
  
  const onSubmit = handleSubmit(async (values) => {
    let formulary = {
      ...values,
      caseSubId:caseId.value,
      userId:mainStore.logedUser.id,
    }

    const resp = await caseStore.updateCase(formulary);

    if(resp == '200') {
      toast.successToast("Caso guardado de manera correcta");
    }
    else if(resp == "403") toast.errorToast("Error al guardar caso verifique info");
    else toast.errorToast("Error de servidor");
  });

  onMounted(async() =>{
    //setear estados
    const { geonames } = await listEstados();
    if(geonames) estadoList.value = geonames;
    else console.log("error al setear estados"); 
  
    //seteamos el form con los valores del caso
    resetForm({
      values:{
        ...props.caseById,
        analistaId:props.caseById.analistaId.name,
      }
    });
    const { subcategories } = await getSubCategoriesService();

    if(subcategories) subCategoriesList.value = subcategories;
    
    const { typesByCategory } = await getTypesService(props.caseById.subCategoriaId);
    if(typesByCategory && typesByCategory.length > 0) typesList.value = typesByCategory;
    else console.log("Error recibiendo la data revizar respuesta");

  });

  onUnmounted(() => {
    caseStore.$reset();
  }); 
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
        <div class="w-full h-full  px-10 py-5 rounded-md shadow-md bg-white overflow-auto" v-if="props.caseById">
            <h1 class="text-2xl font-semibold text-center my-5 text-primary opacity-70"> Caso Numero : {{ caseIdShort }} </h1>
            <form class="p-5 grid grid-cols-3 gap-x-9 w-full h-[90%]" novalidate @submit="onSubmit">

              <!--FECHA ULTIMA ACTUALIZACION-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="createdAt"
                  placeholder=""
                  autocomplete="createdAt"
                  v-model="createdAt" 
                  v-bind="createdAtAttrs"
                  readonly
                />
                <ErrorMessage :err="errors.createdAt"/>
                <label for="createdAt" class="origin-0">Fecha de apertura</label>
              </div>
              <!--FECHA APERTURA-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="updatedAt"
                  placeholder=""
                  autocomplete="updatedAt"
                  v-model="updatedAt" 
                  v-bind="updatedAtAttrs"
                  readonly
                />
                <ErrorMessage :err="errors.updatedAt"/>
                <label for="createdAt" class="origin-0">Fecha de Ultima actualizacion</label>
              </div>

              <!--ENTE REDIRECIONADO-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="enteRedireccionado"
                  placeholder=""
                  autocomplete="enteRedireccionado"
                  v-model="enteRedireccionado" 
                  v-bind="enteRedireccionadoAttrs"
                />
                <ErrorMessage :err="errors.enteRedireccionado"/>
                <label for="enteRedireccionado" class="origin-0">Ente Redireccionado / N folio</label>
              </div>

              <!--VIA DE RESOLUTION-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                class="capitalize"
                  required
                  name="viaResolucion"
                  v-model="viaResolucion" 
                  v-bind="viaResolucionAttrs"
                  >
                  <option disabled value="" selected>seleccionar via de resolucion</option>
                  <option value="administrativa">administrativa</option>
                  <option value="Servicio desconcentrado fondo negro primero">Servicio desconcentrado fondo negro primero</option>
                  <option value="remitido">remitido</option>
                  <option value="recursos propios">recursos propios</option>
                  <option value="no procede">no procede</option>
                </select>
                <label for="viaResolucion" class="origin-0">via de resolucion</label>
                <ErrorMessage :err="errors.viaResolucion"/>
              </div>

              <!--ANALISTA-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="analistaId"
                  placeholder=""
                  autocomplete="analistaId"
                  v-model="analistaId" 
                  v-bind="analistaIdAttrs"
                  readonly
                  class="capitalize"
                />
                <ErrorMessage :err="errors.analistaId"/>
                <label for="analistaId" class="origin-0">Analista encargado</label>
              </div>

              <!--Status-->          
              <div class="relative z-0 w-full mb-10 capitalize" 
                :class="{
                  'text-red-500': status === 'en proceso',
                  'text-green-500': status === 'cerrado'
                }">
                <select 
                class="capitalize"
                  required
                  name="status"
                  v-model="status" 
                  v-bind="statusAttrs"
                  >
                  <option disabled value="" selected>seleccionar status</option>
                  <option  value="contacto inicial" class="text-red-500">
                    Contacto Inicial.
                  </option>
                  <option  value="conformacion del expediente" class="text-red-500">
                    Conformacion del expediente.
                  </option>
                  <option  value="proceso de analisis" class="text-red-500">
                    Proceso de analisis.
                  </option>
                  <option  value="notificacion al solicitante" class="text-red-500">
                    Notificacion al solicitante.
                  </option>
                  <option  value="en proceso" class="text-red-500">
                    Proceso administrativo.
                  </option>
                  <option  value="seguimiento" class="text-red-500">
                    Seguimiento
                  </option>
                  <option  value="cerrado" class="text-green-500" :disabled="viaResolucion == 'en espera'">
                    Cerrado
                  </option>
                </select>
                <label for="status" class="origin-0">Estatus</label>
                <ErrorMessage :err="errors.status"/>
              </div>
              <!--REMITENTE-->          
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                class="capitalize"
                  required
                  name="remitente"
                  v-model="remitente" 
                  v-bind="remitenteAttrs"
                  >
                  <option disabled value="" selected>seleccionar remitente</option>
                  <option  value="O.A.C">
                    oficina de atencion al ciudadano
                  </option>
                  <option  value="ministro">
                    ministro
                  </option>
                  <option  value="viceministerios">
                    viceministerios
                  </option>
                  <option  value="sala situacional">
                    sala situacional
                  </option>
                  <option  value="entes adscritos">
                    entes adscritos
                  </option>
                  <option  value="gabinete ministerial">
                    gabinete ministerial
                  </option>
                  <option  value="abordaje territorial">
                    abordaje territorial
                  </option>
                  <option  value="venapp">
                    venapp
                  </option>
                  <option  value="institucion">
                    institucion
                  </option>
                </select>
                <label for="remitente" class="origin-0">remitente</label>
                <ErrorMessage :err="errors.remitente"/>
              </div>

              <!-- NOMBRE COMPLETO SOLICITANTE-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="nombreSolicitante"
                  placeholder=""
                  autocomplete="nombreSolicitante"
                  v-model="nombreSolicitante" 
                  v-bind="nombreSolicitanteAttrs"
                  class="capitalize"
                />
                <ErrorMessage :err="errors.nombreSolicitante"/>
                <label for="nombreSolicitante" class="origin-0">Nombre completo del solicitante</label>
              </div>

              <!-- CEDULA SOLICITANTE-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="cedulaSolicitante"
                  placeholder=""
                  autocomplete="cedulaSolicitante"
                  v-model="cedulaSolicitante" 
                  v-bind="cedulaSolicitanteAttrs"
                />
                <ErrorMessage :err="errors.cedulaSolicitante"/>
                <label for="cedulaSolicitante" class="origin-0">Cedula del solicitante</label>
              </div>

              <!-- NOMBRE COMPLETO BENEFICIARIO-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="nombreBeneficiario"
                  placeholder=""
                  autocomplete="nombreBeneficiario"
                  v-model="nombreBeneficiario" 
                  v-bind="nombreBeneficiarioAttrs"
                  class="capitalize"
                />
                <ErrorMessage :err="errors.nombreBeneficiario"/>
                <label for="nombreBeneficiario" class="origin-0">Nombre completo del Beneficiario</label>
              </div>

              <!-- CEDULA BENEFICIARIO-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="cedulaBeneficiario"
                  placeholder=""
                  autocomplete="cedulaBeneficiario"
                  v-model="cedulaBeneficiario" 
                  v-bind="cedulaBeneficiarioAttrs"
                />
                <ErrorMessage :err="errors.cedulaBeneficiario"/>
                <label for="cedulaBeneficiario" class="origin-0">Cedula del Beneficiario</label>
              </div>

              <!-- TELEFONO BENEFICIARIO -->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="telefonoBeneficiario"
                  placeholder=""
                  autocomplete="telefonoBeneficiario"
                  v-model="telefonoBeneficiario" 
                  v-bind="telefonoBeneficiarioAttrs"
                />
                <ErrorMessage :err="errors.telefonoBeneficiario"/>
                <label for="telefonoBeneficiario" class="origin-0">telefono del Beneficiario</label>
              </div>

              <!-- EDAD -->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="number"
                  name="edad"
                  placeholder=""
                  autocomplete="edad"
                  v-model="edad" 
                  v-bind="edadAttrs"
                />
                <ErrorMessage :err="errors.edad"/>
                <label for="cedulaBeneficiario" class="origin-0">Edad</label>
              </div>

              <!--GENERO-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                class="capitalize"
                  required
                  name="genero"
                  v-model="genero" 
                  v-bind="generoAttrs"
                  >
                  <option disabled value="" selected>seleccionar genero</option>
                  <option  value="M">
                    masculino
                  </option>
                  <option  value="F">
                    femenino
                  </option>
                </select>
                <label for="genero" class="origin-0">genero</label>
                <ErrorMessage :err="errors.genero"/>
              </div>

              <!--ESTADO-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                  class="capitalize"
                  required
                  name="estado"
                  v-model="estado" 
                  v-bind="estadoAttrs"
                  >
                  <option disabled value="" selected v-if="estadoList.length >= 1">Seleccionar Estado</option>
                  <option disabled value="" selected v-if="estadoList.length < 1">Cargando Entidades ...</option>
                  <option 
                    v-for="estado in estadoList" 
                    :key="estado.geonameId" 
                    :value="estado.toponymName"
                    v-if="estadoList.length > 0">
                      {{ estado.toponymName }}
                  </option>
                </select>
                <label for="estado" class="origin-0">estado</label>
                <ErrorMessage :err="errors.estado"/>
              </div>

              <!--MUNICIPIOS-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                  class="capitalize"
                  required
                  name="municipio"
                  v-model="municipio" 
                  v-bind="municipioAttrs"
                  >
                  <option disabled value="" selected v-if="municipioList.length >= 1">Seleccionar Municipio</option>
                  <option disabled value="" selected v-if="municipioList.length < 1">Cargando Municipios</option>
                  <option 
                    v-for="municipio in municipioList" 
                    :key="municipio.geonameId" 
                    :value="municipio.toponymName"
                    v-if="municipioList.length > 0">
                      {{ municipio.toponymName }}
                  </option>
                </select>
                <ErrorMessage :err="errors.municipio"/>
                <label for="municipio" class="origin-0">municipio</label>
              </div>

              <!--PARROQUIAS-->  
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="parroquia"
                  placeholder=""
                  autocomplete="parroquia"
                  v-model="parroquia" 
                  v-bind="parroquiaAttrs"
                />
                <ErrorMessage :err="errors.parroquia"/>
                <label for="sector" class="origin-0">parroquia</label>
              </div>

              <!--SECTOR-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <input
                  required
                  type="text"
                  name="sector"
                  placeholder=""
                  autocomplete="sector"
                  v-model="sector" 
                  v-bind="sectorAttrs"
                  class="capitalize"
                />
                <ErrorMessage :err="errors.sector"/>
                <label for="sector" class="origin-0">sector</label>
              </div>

              <!--TIPO DE BENEFICIARIO-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                class="capitalize"
                  required
                  name="tipoBeneficiario"
                  v-model="tipoBeneficiario" 
                  v-bind="tipoBeneficiarioAttrs"
                  >
                  <option disabled value="" selected>seleccionar tipo de beneficiario</option>
                  <option value="CONPPA" class="uppercase">conppa</option>
                  <option value="pescador">pescador</option>
                  <option value="acuicultor">acuicultor</option>
                  <option value="particular">particular</option>
                  <option value="institucional">institucional</option>
                </select>
                <label for="tipoBeneficiario" class="origin-0">tipo de beneficiario</label>
                <ErrorMessage :err="errors.tipoBeneficiario"/>
              </div>

              <!-- CATEGORIA -->          
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                class="capitalize"
                  required
                  name="categoria"
                  v-model="categoria" 
                  v-bind="categoriaAttrs"
                  >
                  <option disabled value="" selected>seleccionar categoria</option>
                  <option  value="peticion">
                    peticion
                  </option>
                  <option  value="quejas">
                    quejas
                  </option>
                  <option  value="reclamo">
                    reclamo
                  </option>
                  <option  value="sugerencia">
                    sugerencia
                  </option>
                  <option  value="denuncia">
                    denuncia
                  </option>
                </select>
                <label for="categoria" class="origin-0">categoria</label>
                <ErrorMessage :err="errors.categoria"/>
              </div>

              <!--SUB CATEGORIA-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                class="capitalize"
                  required
                  name="subCategoria"
                  v-model="subCategoriaId" 
                  v-bind="subCategoriaAttrs">
                  <option disabled value="" selected>seleccionar subcategoria</option>
                  <option 
                    v-for="subCategoria in subCategoriesList" 
                    :key="subCategoria._id" 
                    :value="subCategoria._id"
                    v-if="subCategoriesList.length > 0">
                      {{ subCategoria.name}}
                  </option>
                </select>
                <label for="subCategoria" class="origin-0">subCategoria</label>
                <ErrorMessage :err="errors.subCategoriaId"/>
              </div>

              <!--TIPO -->
              <div class="relative z-0 w-full mb-10 capitalize" v-if="values.subCategoriaId && typesList.length > 0">
                <select 
                class="capitalize"
                  required
                  name="tipo"
                  v-model="tipoId" 
                  v-bind="tipoAttrs"
                  >
                  <option disabled value="" selected>seleccionar tipo</option>
                  <option
                    v-for="type in typesList" 
                    :key="type._id" 
                    :value="type._id"
                    v-if="typesList.length > 0" >
                      {{ type.name}}
                  </option>
                </select>
                <label for="categoria" class="origin-0">tipo</label>
                <ErrorMessage :err="errors.tipoId"/>
              </div>

              <!--PRIORIDAD-->
              <div class="relative z-0 w-full mb-10 capitalize">
                <select 
                class="capitalize"
                  required
                  name="prioridad"
                  v-model="prioridad" 
                  v-bind="prioridadAttrs"
                  >
                  <option disabled value="" selected>seleccionar prioridad</option>
                  <option value="urgente-importante">urgente-importante</option>
                  <option value="urgente-noImportante">urgente-no Importante</option>
                  <option value="noUrgente-importante">no urgente-importante</option>
                  <option value="noUrgente-noImportante">no Urgente-no Importante</option>
                </select>
                <label for="prioridad" class="origin-0">prioridad</label>
                <ErrorMessage :err="errors.prioridad"/>
              </div>

              <!--DESCRIPCION-->
              <div class="relative z-0 w-full mb-10">
                <textarea
                  required
                  rows="1" cols="5"
                  name="descripcion"
                  placeholder=""
                  autocomplete="descripcion"
                  v-model="descripcion" 
                  v-bind="descripcionAttrs"
                  class="capitalize textarea-custom"
                >
                </textarea>
                <ErrorMessage :err="errors.descripcion"/>
                <label for="nombreSolicitante" class="origin-0">descripcion</label>
              </div>
              <SubmitButton 
                v-if="(mainStore.logedUser.id == caseById.analistaId._id && mainStore.logedUser.rol != 'auditor')|| mainStore.logedUser.rol == 'auditor'"
                :full-size="true" 
                title="Guardar" 
                class="col-span-3 text-center my-5 mb-auto" 
                :is-disabled="mainStore.logedUser.rol == 'normal' && caseById.status == 'cerrado'">
                <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
              </SubmitButton>
            </form>
        </div>
  </div>
</template>
 
<style scoped lang="scss">
  .textarea-custom {
    resize: none; /* Deshabilita el redimensionamiento */
  }
  input,select,textarea {
    @apply pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-300
  }
  label{
    @apply absolute duration-300 top-3 -z-1 text-gray-500
  }
  /* estilos para evitar errores en ela utocompletar de el formulario */ 
  input {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
    -webkit-background-clip: text !important;
    background-clip:  text !important;
  }
  .-z-1 {
    z-index: -1;
  }
  .origin-0 {
    transform-origin: 0%;
  }
  input:focus ~ label,
  input:not(:placeholder-shown) ~ label,
  textarea:focus ~ label,
  textarea:not(:placeholder-shown) ~ label,
  select:focus ~ label,
  select:not([value='']):valid ~ label {
    /* @apply transform; scale-75; -translate-y-6; */
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    --tw-scale-x: 0.75;
    --tw-scale-y: 0.75;
    --tw-translate-y: -1.5rem;
  }
  input:focus ~ label,
  select:focus ~ label {
    /* @apply text-black; left-0; */
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-text-opacity));
    left: 0px;
  }
</style>