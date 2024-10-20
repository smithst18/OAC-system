<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title: string;
  allowedExtensions: Array<string>;
}>();

const emit = defineEmits<{
  (e: "sendFile", value: File): void;
}>();

const fileName = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

// Función para extraer la extensión del archivo
const getFileExtension = (fileName: string) => {
  return fileName.split(".").pop()?.toLowerCase();
};

const updateFileName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    const file = files[0];
    const fileExtension = getFileExtension(file.name);
    // Validamos la extensión del archivo en lugar del MIME type
    if (!fileExtension || !props.allowedExtensions.includes(fileExtension)) {
      alert("Debe seleccionar un archivo válido con extensión permitida");
      if (fileInput.value) {
        fileInput.value.value = ""; // Limpiar el input
      }
      return;
    }

    fileName.value = file.name; // Actualizar el nombre del archivo
    emit("sendFile", file);
  } else {
    fileName.value = props.title; // Restablecer al título por defecto
  }
};
</script>

<template>
  <div class="relative custom-file-input">
    <!-- Input de archivo oculto -->
    <input id="file-upload" type="file" class="peer hidden" @change="updateFileName" ref="fileInput" />

    <!-- Etiqueta personalizada para el botón con animación de hover -->
    <label for="file-upload"
      class="text-gray-800 duration-300 transform origin-0 peer-focus:text-black peer-focus:-translate-y-6 peer-focus:scale-75 cursor-pointer hover:scale-105 transition-transform ease-in-out">
      Seleccionar
    </label>

    <!-- Mostrar nombre del archivo seleccionado -->
    <span
      class="block ml-auto w-72 break-words overflow-hidden text-ellipsis whitespace-nowrap text-center"
      :class="fileName !== props.title ? 'text-gray-500' : 'text-green-500'">
      {{ props.title }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.custom-file-input {
  @apply flex pt-3 pb-2 border-gray-300 border-b-2 h-11
}
</style>
