<script setup lang="ts">
  import type { User } from '@/interfaces/userInterfaces';
  import { defineAsyncComponent, ref, onUpdated } from 'vue';
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';  
  import { useMainStore } from '@/stores/mainStore';
  import MainSpinner from '@/components/commons/MainSpinner.vue';
  import { useUserStore } from '../store/userStore';
  import { useToast } from '@/composables/useToast';

  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));
  const Button = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
  const GenericModal = defineAsyncComponent(() => import('@/components/commons/GenericModal.vue'));
  const props =  defineProps<{
    showModal:boolean,
    userToupdate:User,
  }>();
  const emit = defineEmits<{
    (event: "close-modal"): void;
  }>();
  
  const { values, errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
      name: yup
      .string().required('Nombre es requerido').trim(),

      ci: yup
      .string().required('Cedula es requerida'),
      
      password: yup
      .string()
      .trim()
      .min(6,'Minimo 6 caracteres'),

      repassword: yup
      .string()
      .trim()
      .min(6,'Minimo 6 caracteres')
      .oneOf([yup.ref('password')],'deben coincidir'),

      birthDate: yup
      .string()
      .trim(),

      phoneNumber: yup
      .string()
      .trim(),

      rol: yup
      .string()
      .default('')
      .required('Seleccione un rol')
      .trim()
    }),
  });
  const showModal2 = ref(false);
  const mainStore = useMainStore();
  const userStore = useUserStore();
  const Toast = useToast();
  const [name,nameAttrs] = defineField('name', /*{validateOnModelUpdate: false, //this options allow the validation in real time default true }*/);
  const [ci,ciAttrs] = defineField('ci');
  const [password,passwordAttrs] = defineField('password');
  const [repassword,repasswordAttrs] = defineField('repassword');
  const [birthDate,birthDateAttrs] = defineField('birthDate');
  const [phoneNumber,phoneNumberAttrs] = defineField('phoneNumber');
  const [rol,rolAttrs] = defineField('rol');
  const modification_Confirm = ref(false);

  const toggleModal1 = () => {
    emit('close-modal');
    modification_Confirm.value = false; 
    resetForm();
  }
  const toggleModal2 = () => {
    showModal2.value = !showModal2.value ;
  }

  const updateUser = handleSubmit(async (values) => {
    //valida el cambio de boton para la confirmacion 
    modification_Confirm.value = false;
    let update =  {
      _id:props.userToupdate._id,
      ...values
    };
    
    const response = await userStore.updateUser(update);
    if(response == '200'){
      Toast.successToast("Usuario actualizado Correctamente")
    }else{
      Toast.errorToast("Error al actualizar Cedula debe ser unica ")
    }

  });

  const unactivateUser = async () => {
    const response = await userStore.deleteUser(props.userToupdate._id);
    if(response == '200'){
      Toast.successToast("Usuario BORRADO Correctamente");
      toggleModal2();
      toggleModal1();
    }else{
      Toast.errorToast("No se pudo borrar el usuario");
    }
  }

  onUpdated(() =>{
    resetForm({values:props.userToupdate});
  })
</script>

<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <GenericModal :show-modal="props.showModal" @close-modal="toggleModal1">
        <template #header>
            <h3>Modificar Usuario</h3>
        </template>
        <template #body>
          <form class="p-5 grid grid-cols-2 gap-x-9 w-full" id="updateForm" novalidate @submit="updateUser">
                <div class="relative z-0 w-full mb-10">
                  <input
                      required
                      type="text"
                      name="name"
                      placeholder=""
                      autocomplete="name"
                      v-model="name" 
                      v-bind="nameAttrs"
                    />
                    <ErrorMessage :err="errors.name"/>
                    <label for="name" class="origin-0">Nombre Completo</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                      required
                      type="text"
                      name="ci"
                      placeholder=""
                      autocomplete="off"
                      v-model="ci" 
                      v-bind="ciAttrs"
                    />
                    <ErrorMessage :err="errors.ci"/>
                    <label for="ci" class="origin-0">Cedula</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder=""
                      autocomplete="new-password"
                      v-model="password" 
                      v-bind="passwordAttrs"
                    />
                    <ErrorMessage :err="errors.password"/>
                    <label for="password" class="origin-0">Contraseña</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                      required
                      type="password"
                      name="repassword"
                      placeholder=""
                      autocomplete="new-password"
                      v-model="repassword" 
                      v-bind="repasswordAttrs"
                    />
                    <ErrorMessage :err="errors.repassword"/>
                    <label for="repassword" class="origin-0">Repetir contraseña</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                      required
                      type="date"
                      name="birthDate"
                      placeholder=""
                      autocomplete="bday"
                      v-model="birthDate" 
                      v-bind="birthDateAttrs"
                    />
                    <ErrorMessage :err="errors.birthDate"/>
                    <label for="birthDate" class="origin-0">Fecha de Nacimiento</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                      required
                      type="text"
                      name="phoneNumber"
                      placeholder=""
                      autocomplete="tel"
                      v-model="phoneNumber" 
                      v-bind="phoneNumberAttrs"
                    />
                    <ErrorMessage :err="errors.phoneNumber"/>
                    <label for="phoneNumber" class="origin-0">Telefono</label>
                </div>  
                <div class="relative z-0 w-full mb-10 text-gray-500">
                  <select 
                    required
                    name="rol"
                    v-model="rol" 
                    v-bind="rolAttrs">
                    <option disabled value="" selected>Selecionar permisos</option>
                    <option  value="admin">
                      Administrador
                    </option>
                    <option  value="auditor">
                      Auditor
                    </option>
                    <option  value="normal">
                      User
                    </option>
                  </select>
                  <label for="rol" class="origin-0">Permisos</label>
                  <ErrorMessage :err="errors.rol"/>
                </div>
                <!--delete user button-->
                <div class="w-full mb-10 border-b-red-300 border-0 border-b-2">
                  <p class="flex items-center justify-center text-red-400 text-line cursor-pointer hover:text-red-300 w-full h-full" @click="toggleModal2"> 
                    Borrar usuario
                    <span class="material-symbols-outlined text-red-500 ml-3 text-base">
                      delete
                    </span></p>
                </div> 
            </Form>
        </template>
        <template #footer>
          <p class="text-red-500 flex-grow-1 text-center" v-if="modification_Confirm">ESTAS SEGURO DE MODIFICAR ESTE USUARIO ?</p>
          <div class="flex justify-around mt-10">
            <Button title="Modificar" class="bg-green-500 hover:bg-green-400 focus:bg-green-400 active:bg-green-400 focus:ring-green-400" :full-size="false" @click="modification_Confirm = true" v-if="!modification_Confirm">
            </Button>

            <!--Main buttons update user-->
            <Button  title="Guardar"  type="submit" form="updateForm" class="bg-green-500 hover:bg-green-400 focus:bg-green-400 active:bg-green-400 focus:ring-green-400" :full-size="false" v-if="modification_Confirm">
              <MainSpinner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
            </Button>
            
            <Button title="Cancelar" class="bg-red-600 hover:bg-red-400 focus:bg-red-400 active:bg-red-400 focus:ring-red-400" :full-size="false" @click="toggleModal1">
            </Button>
            
          </div>
        </template>
    </GenericModal>
    <GenericModal :show-modal="showModal2" @close-modal="toggleModal2">
      <template #header> <p class="text-red-500 text-center w-full">Eliminar Usuario permanentemente ? </p></template>
      <template #body> 
        <div class="my-20">
          <p class=" text-base">Este usuario sera eliminado de manera permanente del sistema </p>
          <div class="flex justify-around my-10">
            <Button title="Aceptar" :full-size="false" class="bg-green-600 hover:bg-green-400 focus:bg-green-400 active:bg-green-400 focus:ring-green-400" @click="unactivateUser">
  
            </Button>
            <Button title="Cancelar" :full-size="false" class="bg-red-600 hover:bg-red-400 focus:bg-red-400 active:bg-red-400 focus:ring-red-400" @click="toggleModal2">
            </Button>
          </div>
        </div>
      </template>
      <template #footer> <p class="text-xs text-center">Esta decision es permanente !</p></template>
    </GenericModal>
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