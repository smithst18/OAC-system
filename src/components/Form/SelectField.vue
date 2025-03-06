<script setup lang="ts">
  import { defineAsyncComponent, watch } from "vue";
  import type { SelectFieldI } from "@/interfaces/selecFieldInterface";
  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));
  
  const props = withDefaults(
    defineProps<{
      modelValue: string | number;
      options: SelectFieldI[];
      name: string;
      label: string;
      error?: string;
      isDisabled?:boolean
    }>(),
    {
      modelValue: '', // Valor por defecto
      isDisabled: false,
    }
  );

  watch( 
    () =>props.isDisabled,
    () => {
      if(props.isDisabled)  emit("update:modelValue", "");
    }
  )

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
    <select
    :value="modelValue"
    required
    :name="name"
    class="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-primary appearance-none capitalize"
    @change="updateValue($event)"
    :disabled="isDisabled">

      <option v-if="options.length < 1">
        Cargando lista ... 
      </option>

      <option v-else v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
      
    </select>
    <label :for="name" class="origin-0">{{ label }}</label>
    <ErrorMessage :err="error" />
  </div>
</template>

<style scoped lang="scss">

select{
  @apply pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-300;
}

label {
  @apply absolute duration-300 top-3 -z-1 text-gray-500;
}

.hidden {
  display: none;
}

.-z-1 {
  z-index: -1;
}

.origin-0 {
  transform-origin: 0%;
}

/* Estilos para la animación de etiqueta flotante */
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
select:focus ~ label {
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
  left: 0px;
}
</style>
