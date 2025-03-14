<script setup lang="ts">  
  import type { Case } from '@/interfaces/caseInterface';
  import type { AxiosResponse } from 'axios';
  import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
  import * as yup from 'yup';
  import { useForm } from 'vee-validate'; 
  import { useToast } from '@/composables/useToast';
  import { useCaseStore } from '../store/caseStore';
  import { useMainStore } from '@/stores/mainStore';
  import { downloadCaseDiary } from "@/services/diaryServices";
  import { toast } from 'vue3-toastify';

  const Modal = defineAsyncComponent(()=> import('@/components/commons/GenericModal.vue'));
  const DiaryItem = defineAsyncComponent(()=> import('@/modules/cases/components/DiaryItem.vue'));
  const Button =  defineAsyncComponent(()=> import('@/components/commons/MainButton.vue'));
  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));
  

  const props = defineProps<{
    showModal: boolean
    case:Case
  }>();

  const emit = defineEmits<{
    ( e:'toggleModal' ) : void,
  }>();
  const caseStore = useCaseStore();
  const mainStore = useMainStore();

  const { values, errors, defineField, handleSubmit, resetField } = useForm({
    validationSchema: yup.object({
      description: yup.string().required('descriction es requerida').trim().min(5,'debe tener al menos 5 caracteres').max(10000,"maximo 10000 caracteres")
    }),
  });
  const Toast = useToast();
  const ScrolBar = ref<HTMLDivElement | null>(null)
  const [description,descriptionAttrs] = defineField('description');

  const scrollToBottom = () => {
    if (ScrolBar.value !== null && ScrolBar.value !== undefined) {
      ScrolBar.value.scrollTo({
        top: ScrolBar.value.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const submitFormulary = handleSubmit(async (values) => {
    
    let toSave =  {
      description:values.description,
      caseStatus:props.case.status,
      casoId: props.case._id,
      userId: mainStore.logedUser.id,
    };
    console.log(toSave)
    const response = await caseStore.saveDiary(toSave);

    if(response == '200'){
      scrollToBottom();
      resetField('description');
      Toast.successToast("Parte diario guardado correctamente");
    }else{
      Toast.errorToast("Error al guardar parte diario ");
    }

  });

  const downLoadDiary = async () => {
    try {
      const resp = await downloadCaseDiary(props.case._id) as AxiosResponse<ArrayBuffer>;
      if(resp.data){
        // Convertir el ArrayBuffer a un Blob con el tipo MIME correcto para un archivo de Word
        const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        // Crear una URL para el Blob
        const url = URL.createObjectURL(blob);
  
        // Crear un enlace temporal y hacer clic en él para iniciar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = `parte_diario_caso_${props.case.subId}.docx`; // Nombre del archivo que se descargará
        document.body.appendChild(a);
        a.click();
  
        // Limpiar
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }else toast.warning('No hay diarios para mostrar')

    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
  }

  onMounted( async () => {
    const resp = await caseStore.setDiaryCaseList(props.case._id);
    if(resp == "200") console.log("diarys Setted");
    else if(resp == "404") console.log("No hay diarios");
    else console.log("Error seteando informacion revizar api");
  });

  onUnmounted(() => {
    caseStore.$reset();
  });
</script>

<template>
  <Teleport to="body">
    <Modal :show-modal="props.showModal" @close-modal="emit('toggleModal')">
      <template #header> 
        <div class="flex items-center w-full">
          <p class="mr-5 text-center">Parte diario :</p>
          <Button 
            :full-size="false" 
            title="" icon="download" 
            class="bg-transparent !text-primary hover:bg-transparent hover:!text-primary-light ml-auto active:bg-transparent focus:outline-none focus:ring-2 focus:ring-transparent active:!text-secondary focus:!text-secondary mr-2" 
            @click="downLoadDiary">
          </Button>
        </div>
      </template>
      <template #body> 
        <div class="w-[650px] h-96 overflow-y-auto" ref="ScrolBar" >
          <div  v-if="caseStore.getCaseDiaryList.length > 0"> 
            <DiaryItem 
                v-for="item in caseStore.getCaseDiaryList" :key="item.userId"
                class="mb-5" 
                :date="item.createdAt" 
                :description="item.description"
                :case-status="item.caseStatus" 
                />
          </div>
          <p class="flex items-center justify-center h-full" v-else> No hay parte diarios disponible </p>
        </div>
      </template>
      <template #footer>
        <div class="w-full h-20 mt-10 p-2" v-if="!mainStore.requestIsLoading">
          <form class="w-full flex" id="updateForm" novalidate @submit="submitFormulary">
            <div class="relative z-0 w-full">
              <input
                  required
                  type="text"
                  name="description"
                  placeholder=""
                  autocomplete="description"
                  v-model="description" 
                  v-bind="descriptionAttrs"
                />
                <ErrorMessage :err="errors.description"/>
                <label for="name" class="origin-0">Observacion</label>
            </div>
            <Button 
              :full-size="false" 
              icon="subdirectory_arrow_left" 
              title="" 
              class="ml-5"
              :is-disabled="caseStore.getCaseById.analistaId._id !== mainStore.logedUser.id">
            </Button>
          </form>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>
 
<style scoped lang="scss">
input,select {
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
    input:not(:placeholder-shown) ~ label,
    textarea:focus ~ label,
    textarea:not(:placeholder-shown) ~ label,
    select:focus ~ label,
    select:not([value='']):valid ~ label {
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
    input:focus ~ label,
    select:focus ~ label {
      /* @apply text-black; left-0; */
      --tw-text-opacity: 1;
      color: rgba(0, 0, 0, var(--tw-text-opacity));
      left: 0px;
    }
</style>