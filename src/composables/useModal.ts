import { ref } from "vue";

export const useModal = (modal:boolean) => {
  
const showModal = ref(modal);

    return {
        showModal,
        toggleModal: () => showModal.value = !showModal.value,
    };
};