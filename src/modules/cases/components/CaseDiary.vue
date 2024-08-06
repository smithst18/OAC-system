<script setup lang="ts">  
  import { defineAsyncComponent, onMounted } from 'vue';
  const Modal = defineAsyncComponent(()=> import('@/components/commons/GenericModal.vue'));
  const DiaryItem = defineAsyncComponent(()=> import('@/modules/cases/components/DiaryItem.vue'));
  const Button =  defineAsyncComponent(()=> import('@/components/commons/MainButton.vue'));
  const props = defineProps<{
    showModal: boolean
    id:string
  }>();

  const emit = defineEmits<{
    ( e:'toggleModal' ) : void,
  }>();

  const AddDiary = () => {
    console.log("do something");
  };

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
        <div class="w-[650px] h-96 overflow-y-auto">
          <DiaryItem v-for="imte in 10" class="mb-5" date="15/04/2024" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique beatae pariatur vero quia veniam sint quaerat accusamus necessitatibus dolor fugiat, mollitia optio neque sapiente in eius ad, illo, velit eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde porro rerum corrupti velit nesciunt earum ullam repellat exercitationem quia magnam nostrum tenetur, ea est tempore. Est at unde repudiandae?"/>
        </div>
      </template>
      <template #footer>
        <div class="">
          <Button 
              :full-size="false" 
              icon="Add" 
              title="Agregar" 
              @doSomething="AddDiary"
              class="mx-auto">
          </Button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>
 
<style scoped lang="scss">

</style>