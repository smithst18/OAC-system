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
  const ToolTip = defineAsyncComponent(() => import('@/components/commons/ToolTip.vue'));

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

  const downLoadCaseSources = async () => {
    try {
      // Abrir el enlace en una nueva ventana
      const fileUrl = `http://${caseStore.getCaseById.file}`; 
      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error('Error al abrir el enlace:', error);
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
    <div class="absolute top-10 right-12 flex gap-5">

      <ToolTip text="Descargar recursos PDF">
        <Button
          :full-size="false" 
          title="" icon="cloud_download"  
          @click="downLoadCaseSources"
          v-if="caseStore.getCaseById._id != ''">
        </Button>
      </ToolTip>

      <ToolTip text="Parte diario">
        <Button
          :full-size="false" 
          title="" icon="menu_book" 
          @click="toggleModal"
          v-if="caseStore.getCaseById._id != ''">
        </Button>
      </ToolTip>

      <ToolTip text="Imprimir planilla">
        <Button
          :full-size="false" 
          title="" icon="print"
          @click="downloadCaseById"
          v-if="caseStore.getCaseById._id != ''">
        </Button>
      </ToolTip>

      <ToolTip text="Planilla Caso Cerrado">
        <Button
          :full-size="false" 
          title="" icon="print_connect" 
          @click="downloadClosedCaseById"
          v-if="caseStore.getCaseById._id != '' && caseStore.getCaseById.status == 'cerrado' && mainStore.logedUser.rol == 'auditor'">
        </Button>
      </ToolTip>
      
    </div>
    <CaseDiary 
      :show-modal="showModal" 
      :case="caseStore.getCaseById"
      @toggleModal="toggleModal" 
      v-if="caseStore.getCaseById._id != ''"
    />
  </div>
</template>
 
<style scoped lang="scss">

</style>