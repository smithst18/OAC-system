<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { defineAsyncComponent, onMounted ,computed, ref } from "vue";
  import { useModal } from '@/composables/useModal';
  import { useCaseStore } from '../store/caseStore';
  import { downloadCasesExcelById, downloadExcelClosedCase } from "@/services/casesServices";
  import type { AxiosResponse } from 'axios';
  import { useMainStore } from '@/stores/mainStore';
  const CaseDiary = defineAsyncComponent(()=> import('@/modules/cases/components/CaseDiary.vue'));
  const CaseForm =  defineAsyncComponent(() => import('@/modules/cases/components/CaseForm.vue'));
  const MainSpinner = defineAsyncComponent(() => import('@/components/commons/MainSpinner.vue'));
  const Button = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
  

  const { showModal, toggleModal } = useModal(false);
  const caseStore = useCaseStore();
  const mainStore = useMainStore();
  const rout =  useRoute();
  const caseId = computed(() => rout.params.id.toString());

  const downloadCaseById = async () => {
    try {
      const resp = await downloadCasesExcelById(caseId.value) as AxiosResponse<ArrayBuffer>;
      if(resp.data){
        // Convertir el ArrayBuffer a un Blob con el tipo MIME correcto para un archivo de Word
        const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  
        // Crear una URL para el Blob
        const url = URL.createObjectURL(blob);
  
        // Crear un enlace temporal y hacer clic en él para iniciar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = `planilla_caso_${caseId.value}.docx`; // Nombre del archivo que se descargará
        document.body.appendChild(a);
        a.click();
  
        // Limpiar
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }else alert("Error al Generar formato");

    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
  };

  const downloadClosedCaseById = async () => {
    alert("FORMATO DE CIERRE")
    try {
      const resp = await downloadExcelClosedCase(caseId.value) as AxiosResponse<ArrayBuffer>;
      if(resp.data){
        
        // Convertir el ArrayBuffer a un Blob con el tipo MIME correcto para un archivo de Word
        const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        // Crear una URL para el Blob
        const url = URL.createObjectURL(blob);

        // Crear un enlace temporal y hacer clic en él para iniciar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = `caso_cerrado_n_${caseId.value}.docx`; // Nombre del archivo que se descargará
        document.body.appendChild(a);
        a.click();

        // Limpiar
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }else alert("Error al Generar formato");
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
  };
  
  onMounted( async () => {
    const resp = await caseStore.setCaseById(caseId.value);
    if(resp === "200"){
      console.log("setted");
    }else {
      console.log("not setted");
    }
  });
</script>

<template>
  <div class="w-full h-full flex items-center justify-center relative">
    <CaseForm :caseById="caseStore.getCaseById" v-if="caseStore.getCaseById._id != ''"/>
    <p class="w-full h-full  bg-white flex items-center justify-center"  v-else>
      Cargando Datos 
      <MainSpinner class="ml-3"/>
    </p>
    <Button 
      :full-size="false" 
      title="" icon="menu_book" 
      class="absolute top-10 right-24" 
      @click="toggleModal"
      v-if="caseStore.getCaseById._id != ''">
    </Button>
    <Button 
      :full-size="false" 
      title="" icon="print" 
      class="absolute top-10 right-44" 
      @click="downloadCaseById"
      v-if="caseStore.getCaseById._id != ''">
    </Button>
    <Button 
      :full-size="false" 
      title="" icon="print_connect" 
      class="absolute top-10 right-64" 
      @click="downloadClosedCaseById"
      v-if="caseStore.getCaseById._id != '' && caseStore.getCaseById.status == 'cerrado' && mainStore.logedUser.rol == 'auditor'">
    </Button>
    <CaseDiary :show-modal="showModal" @toggleModal="toggleModal" :id="caseStore.getCaseById._id" v-if="caseStore.getCaseById._id != ''"/>
  </div>
</template>
 
<style scoped lang="scss">

</style>