<script setup lang='ts'>
  import { defineAsyncComponent } from 'vue';
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';   
  import { useMainStore } from '@/stores/mainStore';
  import { useToast } from '@/composables/useToast';
  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
  const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'));
  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const mainStore = useMainStore();
  const { successToast, errorToast } = useToast();
  const { values, errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
      name: yup
      .string().required('Nombre es requerido').trim(),

      ci: yup
      .string().required('Cedula es requerida'),
      
      password: yup
      .string().required('Contraseña es requerida').min(6,'Minimo 6 caracteres'),

      repassword: yup
      .string()
      .required('repetir Contraseña es requerido')
      .min(6,'Minimo 6 caracteres')
      .oneOf([yup.ref('password')],'deben coincidir'),

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

  const [name,nameAttrs] = defineField('name', /*{validateOnModelUpdate: false, //this options allow the validation in real time default true }*/);
  const [ci,ciAttrs] = defineField('ci')
  const [password,passwordAttrs] = defineField('password')
  const [repassword,repasswordAttrs] = defineField('repassword')
  const [phoneNumber,phoneNumberAttrs] = defineField('phoneNumber')
  const [rol,rolAttrs] = defineField('rol')

  const onSubmit = handleSubmit(async (values) => {
    const resp = await mainStore.signUp(values);
    if(resp === '200'){
      successToast('Usuario creado correctamente');
      resetForm();
    } 
    else if (resp === '403') errorToast('El usuario ya Existe');
    else errorToast('Server Error')
  });

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <div class="bg-white shadow-md rounded-2xl w-full h-[8%] mb-10 border">
          <InfoBar class="text-gray-400"/>
        </div>
        <div class="w-full p-5 rounded-2xl shadow-md bg-white">
            <h1 class="text-2xl font-semibold text-center my-5 text-primary opacity-70">Nuevo usuario</h1>
            <form class="p-16 grid grid-cols-2 gap-x-9 w-full" novalidate @submit="onSubmit">
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
                      Normal
                    </option>
                  </select>
                  <label for="rol" class="origin-0">Permisos</label>
                  <ErrorMessage :err="errors.rol"/>
                </div>
                <submitButton :full-size="true" title="Agregar" class="col-span-2 text-center my-5">
                  <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
                </submitButton>
            </Form>
        </div>
    </div>
</template>

<style scoped lang='scss'>
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