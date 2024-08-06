<script setup lang="ts">  
  import { defineAsyncComponent, onMounted } from 'vue';
  const Modal = defineAsyncComponent(()=> import('@/components/commons/GenericModal.vue'));

  const props = defineProps<{
    showModal: boolean
    id:string
  }>();

  const emit = defineEmits<{
    ( e:'toggleModal' ) : void,
  }>();

  onMounted( async () => {
    console.log(props.id);
  });
</script>

<template>
  <Teleport to="body">
    <Modal :show-modal="props.showModal" @close-modal="emit('toggleModal')">
      <template #header> 
        <p class="mr-5 text-center">Parte diario :</p>
      </template>
      <template #body> 
        <div class="border w-[700px] h-96">
          
        </div>
      </template>
      <template #footer>
         <p class="text-xs text-center"></p>
      </template>
    </Modal>
  </Teleport>
</template>
 
<style scoped lang="scss">

</style>