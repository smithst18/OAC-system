<script setup lang="ts">
  import { defineAsyncComponent } from "vue";

  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));
  
  const props = withDefaults(
    defineProps<{
      modelValue: string | number;
      name: string;
      label: string;
      autocomplete:string;
      rows:number;
      cols:number;
      error?: string;
    }>(),
    {
      modelValue: '', // Valor por defecto
    }
  );


  const emit = defineEmits<{
    (event: "update:modelValue", modelValue: string | number): void;
  }>();

  const updateValue = (event: Event) => {
    const select = event.target as HTMLSelectElement; 
    emit("update:modelValue", select.value);
  };
</script>

<template>
  <div class="relative z-0 w-full mb-10 capitalize">
    <textarea
      :value="modelValue"
      required
      :name="name"
      placeholder=""
      :autocomplete="autocomplete"
      class="textarea-custom"
      @change="updateValue($event)"
    >
    </textarea>
    <label :for="name" class="origin-0">{{ label }}</label>
    <ErrorMessage :err="error"/>
  </div>
</template>
 
<style scoped lang="scss">
.textarea-custom {
    resize: vertical; /* Permite el redimensionamiento vertical */
    max-height: 150px; /* Establece la altura máxima en píxeles */
    overflow-y: auto; /* Agrega una barra de desplazamiento si el contenido excede la altura máxima */
}
.textarea-custom {
  //resize: none; /* Deshabilita el redimensionamiento */
}

textarea {
  @apply  block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-300;
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

textarea:focus ~ label,
textarea:not(:placeholder-shown) ~ label {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(0.75) scaleY(0.75);
  --tw-translate-y: -1.5rem;
}

textarea:focus ~ label {
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
  left: 0px;
}
</style>