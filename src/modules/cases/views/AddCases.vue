<script setup lang="ts">
  import { useMainStore } from '@/stores/mainStore';
  import { useCaseStore } from "@/modules/cases/store/caseStore";
  import { useToast } from '@/composables/useToast';
  import { ref, defineAsyncComponent, onMounted, watch } from 'vue';
  import * as yup from 'yup';
  import { useForm, useResetForm,  } from 'vee-validate';
  import { getSubCategoriesService } from "@/services/subCategoryServices"; 
  import { getTypesService } from "@/services/typesServices"; 
  import type { subCategory } from "@/interfaces/categoryInterface";

  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
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
      subCategoriaId: yup .string().required('categoria es requerido').trim(),
      tipoId: yup .string().trim(),
      prioridad: yup .string().required('prioridad es requerido').trim(),
    }),
  });

  const mainStore = useMainStore();
  const caseStore = useCaseStore();
  const toast = useToast();
  
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

  const subCategoriesList = ref<subCategory[]>([]);
  const typesList = ref<subCategory[]>([]);

  //watcher para setear las sub categorias
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
      analistaId: mainStore.logedUser.id,
    } 
    const resp = await caseStore.saveCase(formulary);

    if(resp == '200') {
      toast.successToast("Caso guardado de manera correcta");
      resetForm()
    }
    else if(resp == "403") toast.errorToast("Error al guardar caso verifique info");
    else toast.errorToast("Error de servidor");
  });

  onMounted(async() =>{
    const { subcategories } = await getSubCategoriesService();

    if(subcategories && subcategories.length > 0){
      subCategoriesList.value = subcategories;
    }else console.log("Error recibiendo la data revizar respuesta");
  });
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
        <div class="w-full h-full  px-10 py-5 rounded-2xl shadow-md bg-white overflow-auto">
            <h1 class="text-2xl font-semibold text-center my-5 text-primary opacity-70">Agregar nuevo caso</h1>
            <form class="p-5 grid grid-cols-3 gap-x-9 w-full" novalidate @submit="onSubmit">
              <!--REMITENTE-->          
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
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
              <div class="relative z-0 w-full mb-10">
                <input
                  required
                  type="text"
                  name="nombreSolicitante"
                  placeholder=""
                  autocomplete="nombreSolicitante"
                  v-model="nombreSolicitante" 
                  v-bind="nombreSolicitanteAttrs"
                />
                <ErrorMessage :err="errors.nombreSolicitante"/>
                <label for="nombreSolicitante" class="origin-0">Nombre completo del solicitante</label>
              </div>

              <!-- CEDULA SOLICITANTE-->
              <div class="relative z-0 w-full mb-10">
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
              <div class="relative z-0 w-full mb-10">
                <input
                  required
                  type="text"
                  name="nombreBeneficiario"
                  placeholder=""
                  autocomplete="nombreBeneficiario"
                  v-model="nombreBeneficiario" 
                  v-bind="nombreBeneficiarioAttrs"
                />
                <ErrorMessage :err="errors.nombreBeneficiario"/>
                <label for="nombreBeneficiario" class="origin-0">Nombre completo del Beneficiario</label>
              </div>

              <!-- CEDULA BENEFICIARIO-->
              <div class="relative z-0 w-full mb-10">
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
              <div class="relative z-0 w-full mb-10">
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
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
                <select 
                class="capitalize"
                  required
                  name="edad"
                  v-model="edad" 
                  v-bind="edadAttrs"
                  >
                  <option disabled value="" selected>seleccionar edad</option>
                  <option  value="0-2">
                    0-24 meses
                  </option>
                  <option  value="3-11">
                    3-11 años
                  </option>
                  <option  value="12-17">
                    12-17 años
                  </option>
                  <option  value="18-30">
                    18-30 años
                  </option>
                  <option  value="31-69">
                    31-69 años
                  </option>
                  <option  value="70">
                    mayor a 70 años
                  </option>
                </select>
                <label for="edad" class="origin-0">edad</label>
                <ErrorMessage :err="errors.edad"/>
              </div>

              <!--GENERO-->
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
                <select 
                class="capitalize"
                  required
                  name="genero"
                  v-model="genero" 
                  v-bind="generoAttrs"
                  >
                  <option disabled value="" selected>seleccionar genero</option>
                  <option  value="masculino">
                    masculino
                  </option>
                  <option  value="femenino">
                    femenino
                  </option>
                </select>
                <label for="genero" class="origin-0">genero</label>
                <ErrorMessage :err="errors.genero"/>
              </div>

              <!--ESTADO-->
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
                <select 
                class="capitalize"
                  required
                  name="estado"
                  v-model="estado" 
                  v-bind="estadoAttrs"
                  >
                  <option disabled value="" selected>seleccionar estado</option>
                  <option value="Amazonas">Amazonas</option>
                  <option value="Anzoátegui">Anzoátegui</option>
                  <option value="Apure">Apure</option>
                  <option value="Aragua">Aragua</option>
                  <option value="Barinas">Barinas</option>
                  <option value="Bolívar">Bolívar</option>
                  <option value="Carabobo">Carabobo</option>
                  <option value="Cojedes">Cojedes</option>
                  <option value="Delta amacuro">Delta Amacuro</option>
                  <option value="Falcón">Falcón</option>
                  <option value="Guárico">Guárico</option>
                  <option value="Lara">Lara</option>
                  <option value="Mérida">Mérida</option>
                  <option value="Miranda">Miranda</option>
                  <option value="Monagas">Monagas</option>
                  <option value="Nueva esparta">Nueva Esparta</option>
                  <option value="Portuguesa">Portuguesa</option>
                  <option value="Sucre">Sucre</option>
                  <option value="Táchira">Táchira</option>
                  <option value="Trujillo">Trujillo</option>
                  <option value="Vargas">Vargas</option>
                  <option value="Yaracuy">  Yaracuy</option>
                  <option value="Zulia">  Zulia</option>
                  <option value="Distrito Capital">  Distrito Capital</option>
                  <option value="Dependencias Federales">  Dependencias Federales </option>
                </select>
                <label for="estado" class="origin-0">estado</label>
                <ErrorMessage :err="errors.estado"/>
              </div>

              <!--MUNICIPIOS-->
              <div class="relative z-0 w-full mb-10">
                <input
                  required
                  type="text"
                  name="municipio"
                  placeholder=""
                  autocomplete="municipio"
                  v-model="municipio" 
                  v-bind="municipioAttrs"
                />
                <ErrorMessage :err="errors.municipio"/>
                <label for="municipio" class="origin-0">municipio</label>
              </div>

              <!--PARROQUIAS-->
              
              <div class="relative z-0 w-full mb-10">
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
                <label for="parroquia" class="origin-0">parroquia</label>
              </div>

              <!--SECTOR-->
              <div class="relative z-0 w-full mb-10">
                <input
                  required
                  type="text"
                  name="sector"
                  placeholder=""
                  autocomplete="sector"
                  v-model="sector" 
                  v-bind="sectorAttrs"
                />
                <ErrorMessage :err="errors.sector"/>
                <label for="sector" class="origin-0">sector</label>
              </div>

              <!--TIPO DE BENEFICIARIO-->
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
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
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
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
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
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
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize" v-if="values.subCategoriaId && typesList.length > 0">
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
              <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
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
                  <option value="denuncia">denuncia</option>
                </select>
                <label for="prioridad" class="origin-0">prioridad</label>
                <ErrorMessage :err="errors.prioridad"/>
              </div>

              <submitButton :full-size="true" title="Agregar" class="col-span-3 text-center my-5 mb-auto">
                <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
              </submitButton>
            </Form>
        </div>
  </div>
</template>
 
<style scoped lang="scss">
input,select {
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