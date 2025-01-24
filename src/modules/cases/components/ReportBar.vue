<script setup lang="ts">
  import type { FilterI } from "@/interfaces/filterInterface";
  import { defineAsyncComponent } from "vue";
  import { useMainStore } from "@/stores/mainStore";
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';
  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));

  const mainStore = useMainStore();
  const emit = defineEmits<{
    (e: 'sendFilter', filterParams: FilterI): void
  }>();

  const { values, errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
      field: yup
        .string()
        .required('Campo es requerido')
        .trim(),
      parameter: yup
        .string()
        .required('Ingrese el valor del campo seleccionado')
        .trim(),
      fechaStart: yup
        .date()
        .required('La fecha de inicio es requerida')
        .max(yup.ref('fechaEnd'), 'La fecha de inicio no puede ser mayor que la fecha de fin'),
      fechaEnd: yup
        .date()
        .required('La fecha de fin es requerida')
        .min(yup.ref('fechaStart'), 'La fecha final no puede ser menor que la fecha de inicio'),

    }),
  });

  const [field,fieldAttrs] = defineField('field');
  const [parameter,paramAttrs] = defineField('parameter');
  const [fechaStart,fechaStartAttrs] = defineField('fechaStart');
  const [fechaEnd,fechaEndAttrs] = defineField('fechaEnd');

  const onSubmit = handleSubmit(async (values: any) => {
  // Crear fechas asegurándote de que se consideren en UTC
  const fechaStart = new Date(values.fechaStart + 'T00:00:00Z'); // Forzamos UTC añadiendo 'Z'
  const fechaEnd = new Date(values.fechaEnd + 'T00:00:00Z');

  let ParamsToEmit: FilterI = {
    field:values.field,
    fieldValue:values.parameter,
    startDate: fechaStart.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC' // Usar zona horaria UTC para evitar desplazamientos
    }),
    endDate: fechaEnd.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC' // Usar zona horaria UTC para evitar desplazamientos
    })
  };
  emit('sendFilter', ParamsToEmit);
});

</script>

<template>
  <div class="w-full h-20 bg-cyan-50 border border-cyan-500 rounded-2xl flex items-center justify-center">
    <form class="w-full h-[90%] grid grid-cols-5 gap-x-9 p-5" novalidate @submit="onSubmit">

      <!-- CAMPO A VALIDAD-->

      <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
        <select 
          class="capitalize"
          required
          name="field"
          v-model="field" 
          v-bind="fieldAttrs"
        >
          <option disabled value="" selected>seleccionar campo</option>
          <option value="estado">estado</option>
          <option value="tipoBeneficiario">tipo de beneficiario</option>
          <option value="categoria">categoria</option>
          <option value="prioridad">prioridad</option>
          <option value="genero">genero</option>
          <option value="edad">edad</option>
        </select>
        <label for="field" class="origin-0">Campo</label>
        <ErrorMessage :err="errors.field"/>
      </div>

      <!-- VALOR DEL CAMPO -->

      <div class="relative z-0 w-full mb-10">
        <input
          required
          type="text"
          name="parameter"
          placeholder=""
          autocomplete="parameter"
          v-model="parameter" 
          v-bind="paramAttrs"
        />
        <ErrorMessage :err="errors.parameter"/>
        <label for="parameter" class="origin-0">Valor del Campo</label>
      </div>
      

      <!-- FECHA INICIAL DE REPORTE -->
      
      <div class="relative z-0 w-full mb-10">
        <input
          required
          type="date"
          name="fechaStart"
          placeholder=""
          autocomplete="fechaEnd"
          aria-details="sdasdad"
          v-model="fechaStart" 
          v-bind="fechaStartAttrs"
        />
        <ErrorMessage :err="errors.fechaStart"/>
        <label for="fechaStart" class="origin-0">Fecha Inicio</label>
      </div>

      <!-- FECHA FINAL DE REPORT-->

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
        <ErrorMessage :err="errors.fechaEnd"/>
        <label for="fechaEnd" class="origin-0">Fecha final</label>
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