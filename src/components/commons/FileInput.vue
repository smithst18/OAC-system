<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  title:string,
  allowedExtensions:Array<string>,
}>();
const emit = defineEmits<{
  (e: 'sendFile', value: File): void
}>();

const fileName = ref(props.title)
const fileInput = ref<HTMLInputElement | null>(null);

const updateFileName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    const file = files[0];
    if (!props.allowedExtensions.includes(file.type)) {
      alert("Debe ser un archivo PDF");
      // Restablecer el valor del input
      if (fileInput.value) {
        fileInput.value.value = ""; // Limpiar el input
      }
      return; // Salir de la función
    }
    fileName.value = file.name; // Actualizar el nombre del archivo
    emit("sendFile",file);
  } else {
    fileName.value = props.title; // Restablecer al título por defecto
  }
};
</script>

<template>
  <div class="relative custom-file-input">
    <!-- Input de archivo oculto -->
    <input id="file-upload" type="file" class="peer hidden" @change="updateFileName" ref="fileInput"/>

    <!-- Etiqueta personalizada para el botón con animación de hover -->
    <label for="file-upload" class="text-gray-500 duration-300 transform origin-0 peer-focus:text-black peer-focus:-translate-y-6 peer-focus:scale-75 cursor-pointer hover:scale-105 transition-transform ease-in-out">
      Seleccionar archivo
    </label>

    <!-- Mostrar nombre del archivo seleccionado -->
    <span class="block ml-auto w-72 break-words overflow-hidden text-ellipsis whitespace-nowrap text-center"
      :class="fileName === props.title ? 'text-gray-500' : 'text-green-500'">
      {{ fileName }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.custom-file-input {
  @apply border-0 border-b-2 border-opacity-25 border-gray-500 flex pt-3 pb-2 hover:outline-none hover:ring-0 hover:border-primary;
}
</style>
