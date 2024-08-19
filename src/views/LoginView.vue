<script setup lang="ts">
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { useMainStore } from '@/stores/mainStore';
  import { useRouter } from 'vue-router';
  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const SubmitButton =  defineAsyncComponent(()=> import('@/components/commons/MainButton.vue'));
  const mainStore = useMainStore();
  const router = useRouter();
  const error = ref(false);
  const apiServerError = ref(false);

  const formData = reactive({
    ci:'',
    password:'',
  });

  const onSubmit = async () =>{
    const resp = await mainStore.logIn(formData);
    if(resp === '200'){
      error.value = false;
      if(mainStore.logedUser.rol == "admin") router.push({ name:'management' });
      else router.push({ name:'home' });
    }  
    else if(resp === "400") error.value = true;
    else if(resp === "500") apiServerError.value = true;
    else{
      error.value = false;
      apiServerError.value = false;
    }
  }

</script>

<template>
  <div class="h-screen w-screen flex justify-end" id="login"> 
    <div class="w-1/2 h-full flex flex-col items-center bg-third rounded-bl-md rounded-tl-[18%] px-28 py-20">
      <p class="w-full text-3xl text-primary">
        ¡Hola!<br>
        <span class="text-5xl">Bienvenido</span>
      </p>
      <!-- fORMULARIO -->
      <form  id="form" class="w-full h-[70%] mt-20 p-10 bg-white flex flex-col"
      @keypress.enter="onSubmit"
      @submit.prevent="onSubmit">
        <p class="text-center text-2xl text-primary my-8">Inicia sesión en tu cuenta </p>
        <div class="relative z-0 w-full mb-10">
          <input
          type="text"
          name="userName"
          required
          placeholder=" "
          autocomplete="userName"
          oninvalid="this.setCustomValidity('Porfavor introduce la cedula')" 
          oninput="setCustomValidity('')"
          v-model="formData.ci"
          />
          <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-primary text-base">Usuario</label>
        </div>
  
        <div class="relative z-0 w-full mb-10">
          <input
          type="password"
          name="password"
          required
          placeholder=" "
          autocomplete="current-password"
          oninvalid="this.setCustomValidity('Ingrese su contraseña')" 
          oninput="setCustomValidity('')"
          v-model="formData.password"
          />
          <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-primary text-base">Contraseña</label>
        </div>
        <span class="text-sm text-red-400 text-opacity-90 text-center" v-if="error">Usuario o contraseña invalidos</span>
        <span class="text-sm text-red-400 text-opacity-90 text-center" v-if="apiServerError">Error en la Conexion con Servidor</span>
        <SubmitButton :full-size="true" title="Iniciar Sesion" @click="onSubmit"> 
          <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/><!-- this fix center the spinner with the text in parent component-->
        </SubmitButton>
        <button 
        type="button"
        class=" text-primary text-base mt-5">
          recuperar Contraseña
        </button>
      </form>
    </div> 
  </div>
</template>

<style scoped>
#login {
  background-image: url("../assets/imgs/fondologin.svg");
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