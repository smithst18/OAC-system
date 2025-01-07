<script setup lang="ts">

  import{defineAsyncComponent } from "vue";
  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));

  const props = withDefaults(
    defineProps<{
      modelValue: string | number;
      type: 'text' | 'password' | 'date' | 'number';
      name: string;
      autocomplete: string;
      label: string;
      error?: string;
      readonly?:boolean;
    }>(),
    {
      modelValue: '', // Valor por defecto
    }
  );
  

  const emit = defineEmits<{
    (event: "update:modelValue", modelValue: string): void;
  }>();


  const updateValue = (event: Event) => {
    const input = event.target as HTMLInputElement;
    emit("update:modelValue", input.value);
  };

</script>


<template>
  <div class="relative z-0 w-full mb-10 capitalize">
    <input
      :value="modelValue"
      @input="updateValue($event)"
      required
      :type="type"
      :name="name"
      placeholder=""
      :autocomplete="autocomplete"
      :readonly="readonly"
    />
    <slot>
    </slot>
    <ErrorMessage :err="error" />
    <label :for="name" class="origin-0">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
  input {
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
    input:not(:placeholder-shown) ~ label{
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
    input:focus ~ label {
      /* @apply text-black; left-0; */
      --tw-text-opacity: 1;
      color: rgba(0, 0, 0, var(--tw-text-opacity));
      left: 0px;
    }
</style>


