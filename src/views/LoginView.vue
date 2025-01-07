<script setup lang="ts">
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { useMainStore } from '@/stores/mainStore';
  import { useRouter } from 'vue-router';
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';

  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const MainForm = defineAsyncComponent(() => import('@/components/Form/MainForm.vue'));
  const InputField = defineAsyncComponent(() => import('@/components/Form/InputField.vue'));
  const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));

  const mainStore = useMainStore();
  const router = useRouter();
  const error = ref(false);
  const apiServerError = ref(false);

  const { values, errors, defineField, handleSubmit } = useForm({
    validationSchema: yup.object({
      ci: yup .string().required('Cedula de indentidad requerida'),
      password: yup.string().required('contraseña requerida').trim(),
    }),
  });

  const [ci] = defineField('ci');
  const [password] = defineField('password');

  const formData = reactive({
    ci:'',
    password:'',
  });
  const showPassword = ref(false);

  const handleShowPassword = () => showPassword.value = !showPassword.value;

  const onSubmit = handleSubmit(async (values) => {

    formData.ci = values.ci;
    formData.password = values.password;

    const resp = await mainStore.logIn(formData);
    if(resp === '200'){
      error.value = false;
      if(mainStore.logedUser.rol == "admin"){
        router.push({ name:'management' });
      }
      else{
        router.push({ name:'home' });
      } 
    }  
    else if(resp === "400") error.value = true;
    else if(resp === "500") apiServerError.value = true;
    else{
      error.value = false;
      apiServerError.value = false;
    }
  });
</script>

<template>
  <div class="h-screen w-screen flex justify-end"> 
    <p class="absolute text-white text-xl bottom-0 left-1/2">V 1.2.0</p>
    <div class="w-1/2 h-full flex flex-col items-center login">
    </div> 
    <div class="w-1/2 h-full flex flex-col items-center bg-third  px-28 py-20">
      <div class="flex w-full items-center">
        <p class="w-full text-3xl text-primary">
          ¡Hola!
          <br>
          <span class="text-5xl">Bienvenido</span>
        </p>
        <img src="@/assets/imgs/banderalogo.svg" alt="" class="h-36 mr-auto">
      </div>
      <!-- fORMULARIO -->

      <MainForm @submit="onSubmit" :cols="1"  id="form" class="border border-white w-full h-[70%] mt-20 p-16 bg-white rounded-md">
        <template v-slot:content>
          <p class="text-center text-2xl text-primary my-8">Inicia sesión en tu cuenta </p>
          <InputField v-model="ci"  type="text" name="ci" autocomplete="username"  label="Cedula" :error="errors.ci"/>
          <InputField v-model="password" :type="showPassword ? 'text' : 'password'" name="password" autocomplete="current-password"  label="contraseña" :error="errors.password">
            <transition name="fade">
              <span 
                class="material-symbols-outlined absolute top-3 right-1 cursor-pointer text-primary" 
                @click="handleShowPassword"
                v-if="showPassword">
                visibility
              </span>
            </transition>
            <transition name="fade">
              <span 
                class="material-symbols-outlined absolute top-3 right-1 cursor-pointer text-primary" 
                @click="handleShowPassword"
                v-if="!showPassword">
                visibility_off
              </span>
            </transition>
          </InputField>
          <span class="text-sm text-green-400 text-opacity-90 text-center mb-3" v-if="mainStore.logedUser.id != ''">Sesion Iniciada</span>
          <span class="text-sm text-red-400 text-opacity-90 text-center" v-if="error && !apiServerError">Usuario o contraseña invalidos</span>
          <span class="text-sm text-red-400 text-opacity-90 text-center" v-if="apiServerError">Error en la Conexion con Servidor</span>
          <submitButton :full-size="true" title="Iniciar Sesion" @click="onSubmit" class="mt-10 h-12">
            <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
          </submitButton>
        </template>
      </MainForm>
    </div> 
  </div>
</template>

<style scoped>
/* efectos visuales para icono de mostrar y ocultar */
/* Define la transición para el efecto de desvanecimiento (fade) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}


/**/
.login {
  background-image: url("../assets/imgs/login.jpeg");
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover ;
}
input {
  @apply pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-300
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