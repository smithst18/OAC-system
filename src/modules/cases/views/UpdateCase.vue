<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { defineAsyncComponent, onMounted ,computed, ref } from "vue";
  import { useModal } from '@/composables/useModal';
  import { useCaseStore } from '../store/caseStore';
  const CaseDiary = defineAsyncComponent(()=> import('@/modules/cases/components/CaseDiary.vue'));
  const CaseForm =  defineAsyncComponent(() => import('@/modules/cases/components/CaseForm.vue'));
  const MainSpinner = defineAsyncComponent(() => import('@/components/commons/MainSpinner.vue'));
  const Button = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
  
  const { showModal, toggleModal } = useModal(false);
  const caseStore = useCaseStore();
  const rout =  useRoute();
  const caseId = computed(() => rout.params.id);

  onMounted( async () => {
    
    const resp = await caseStore.setCaseById(caseId.value.toString());
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
    <Button :full-size="false" title="" icon="menu_book" class="absolute top-10 right-24" @click="toggleModal">
      
    </Button>
    <CaseDiary :show-modal="showModal" @toggleModal="toggleModal" :id="caseStore.getCaseById._id" v-if="caseStore.getCaseById._id != ''"/>
  </div>
</template>
 
<style scoped lang="scss">

</style>