<script setup lang="ts">
import type { FilterI } from "@/interfaces/filterInterface"
  import { defineAsyncComponent, reactive } from "vue";
  import { useMainStore } from "@/stores/mainStore";
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';
  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));

  const mainStore = useMainStore();
  const emit = defineEmits<{
    (e: 'filter', filterParam: object): void
  }>();

  const filters = reactive<FilterI>({
    field: '',
    parameter: '',      
    fechaStart: new Date(),  
    fechaEnd: new Date(),      
  });

  const { values, errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
      // remitente: yup.string().required('Remitente es requerido').trim(),
      // nombreSolicitante: yup .string().required('Nombre del Solicitante es requerido').trim(),
      // cedulaSolicitante: yup .string().required('Cedula del Solicitante es requerido').trim(),
    }),
  });

  const [field,fieldAttrs] = defineField('parameter');
  const [parameter,paramAttrs] = defineField('parameter');
  const [fechaStart,fechaStartAttrs] = defineField('fechaStart');
  const [fechaEnd,fechaEndAttrs] = defineField('fechaEnd');

  const onSubmit = handleSubmit(async (values:any) => {
    alert('generando reporte');
    console.log(values);
  });

</script>

<template>
  <div class="border border-green-500 w-full h-20">
    <form class="w-full h-full grid grid-cols-5 gap-x-9 p-5" novalidate @submit="onSubmit">

      <!-- NOMBRE COMPLETO SOLICITANTE-->
      <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
        <select 
          class="capitalize"
          required
          name="field"
          v-model="field" 
          v-bind="fieldAttrs"
        >
          <option disabled value="" selected>seleccionar prioridad</option>
          <option value="urgente-importante">urgente-importante</option>
          <option value="urgente-noImportante">urgente-no Importante</option>
          <option value="noUrgente-importante">no urgente-importante</option>
          <option value="noUrgente-noImportante">no Urgente-no Importante</option>
        </select>
        <label for="prioridad" class="origin-0">Campo</label>
        <ErrorMessage :err="errors.prioridad"/>
      </div>

      <!-- NOMBRE COMPLETO SOLICITANTE-->
      <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
        <select 
          class="capitalize"
          required
          name="parameter"
          v-model="parameter" 
          v-bind="paramAttrs"
        >
          <option disabled value="" selected>seleccionar prioridad</option>
          <option value="urgente-importante">urgente-importante</option>
          <option value="urgente-noImportante">urgente-no Importante</option>
          <option value="noUrgente-importante">no urgente-importante</option>
          <option value="noUrgente-noImportante">no Urgente-no Importante</option>
        </select>
        <label for="prioridad" class="origin-0">Valor</label>
        <ErrorMessage :err="errors.prioridad"/>
      </div>
      
      <!-- NOMBRE COMPLETO SOLICITANTE-->
      <div class="relative z-0 w-full mb-10">
        <input
          required
          type="date"
          name="fechaStart"
          placeholder=""
          autocomplete="fechaStart"
          v-model="fechaStart" 
          v-bind="fechaStartAttrs"
        />
        <!-- <ErrorMessage :err="errors.nombreSolicitante"/> -->
        <label for="nombreSolicitante" class="origin-0">Fecha inicio</label>
      </div>

      <!-- NOMBRE COMPLETO SOLICITANTE-->

      <div class="relative z-0 w-full mb-10">
        <input
          required
          type="date"
          name="nombreSolicitante"
          placeholder=""
          autocomplete="fechaEnd"
          v-model="fechaEnd" 
          v-bind="fechaEndAttrs"
        />
        <!-- <ErrorMessage :err="errors.nombreSolicitante"/> -->
        <label for="nombreSolicitante" class="origin-0">Fecha final</label>
      </div>


      <submitButton :full-size="true" title="Generar" class="text-center h-10">
        <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
      </submitButton>
    </Form>
  </div>
</template>
 
<style scoped lang="scss">

input,select {
  @apply pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-300;
}

label {
  @apply absolute duration-300 top-3 -z-1 text-gray-500;
}

.hidden {
  display: none;
}
input {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
}

.-z-1 {
  z-index: -1;
}

.origin-0 {
  transform-origin: 0%;
}

/* Estilos para la animación de etiqueta flotante */
input:focus ~ label,
input:not(:placeholder-shown) ~ label,
textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label,
select:focus ~ label,
select:not([value='']):valid ~ label {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(0.75) scaleY(0.75);
  --tw-translate-y: -1.5rem;
}

input:focus ~ label,
select:focus ~ label {
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
  left: 0px;
}
</style>