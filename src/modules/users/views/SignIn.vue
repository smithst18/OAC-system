<script setup lang='ts'>
  import { defineAsyncComponent, onMounted, ref } from 'vue';
  import * as yup from 'yup';
  import { useForm } from 'vee-validate';   
  import { useMainStore } from '@/stores/mainStore';
  import { useUserStore } from '@/modules/users/store/userStore';
  import { useToast } from '@/composables/useToast';
  import { listEstados } from "@/services/DTPservices";
  import type { SelectFieldI } from "@/interfaces/selecFieldInterface";
  import type { Entity } from "@/interfaces/Entity";

  const MainForm = defineAsyncComponent(() => import('@/components/Form/MainForm.vue'));
  const InputField = defineAsyncComponent(() => import('@/components/Form/InputField.vue'));
  const SelectField = defineAsyncComponent(() => import('@/components/Form/SelectField.vue'));
  const MainSpiner = defineAsyncComponent(()=> import('@/components/commons/MainSpinner.vue'));
  const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));

  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));

  const mainStore = useMainStore();
  const userStore = useUserStore(); 

  const { successToast, errorToast } = useToast();
  const { values, errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
      name: yup
      .string().required('Nombre es requerido').trim(),

      ci: yup
      .string().required('Cedula es requerida').trim(),
      
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
      .trim(),

      state: yup
      .string()
      .default('')
      .required('Seleccione un estado')
      .trim()
    }),
  });

  const [name] = defineField('name', /*{validateOnModelUpdate: false, //this options allow the validation in real time default true }*/);
  const [ci] = defineField('ci');
  const [password] = defineField('password');
  const [repassword] = defineField('repassword');
  const [phoneNumber] = defineField('phoneNumber');
  const [state] = defineField('state');
  const [rol] = defineField('rol');

  const estadoList = ref<SelectFieldI[]>([]);


  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    const resp = await userStore.signUp(values);
    if(resp === '200'){
      successToast('Usuario creado correctamente');
      resetForm();
    } 
    else if (resp === '403') errorToast('El usuario ya Existe');
    else errorToast('Server Error')
  });

  onMounted(async () => {
    try {
      const response = await listEstados();
      if (response && response.geonames && Array.isArray(response.geonames)) {
        estadoList.value = response.geonames.map((elm: Entity) => ({ label: elm.toponymName, value: elm.toponymName }));
      } else {
        throw new Error("Formato de datos inválido");
      }
    } catch (error) {
      errorToast("Error al cargar los estados");
      console.error(error);
    }
  });
</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <div class="bg-white shadow-md rounded-2xl w-full h-[8%] mb-10 border">
          <InfoBar class="text-gray-400"/>
        </div>
        <div class="w-1/2 p-5 rounded-2xl shadow-md bg-white">
            <h1 class="text-2xl font-semibold text-center my-5 text-primary opacity-70">Nuevo usuario</h1>

            <MainForm @submit="onSubmit" :cols="2">
              <template v-slot:content>
                <InputField v-model="name"  type="text" name="name" autocomplete="name"  label="Nombre" :error="errors.name"/>
                <InputField v-model="ci"  type="text" name="ci" autocomplete="ci"  label="Cedula" :error="errors.ci"/>
                <InputField v-model="password"  type="text" name="password" autocomplete="password"  label="Contrasena" :error="errors.password"/>
                <InputField v-model="repassword"  type="text" name="repassword" autocomplete="repassword"  label="Repetir Contrasena" :error="errors.repassword"/>
                <InputField v-model="phoneNumber"  type="text" name="phoneNumber" autocomplete="phoneNumber"  label="Telefono" :error="errors.phoneNumber"/>
                <SelectField v-model="state" name="state"  label="Estado" :error="errors.state" :options="estadoList" />
                <SelectField v-model="rol" name="rol"  label="tipo de usuario" :error="errors.rol"
                :options="[
                  { label: 'Administrador', value: 'admin' },
                  { label: 'Auditor', value: 'auditor' },
                  { label: 'User', value: 'normal' },
                ]"/>
                <submitButton :full-size="true" title="Agregar" class="col-span-2 text-center my-5">
                  <MainSpiner class="ml-[-15px]" v-if="mainStore.requestIsLoading"/>
                </submitButton>
              </template>
            </MainForm>

            <!-- <form class="p-16 grid grid-cols-2 gap-x-9 w-full" novalidate @submit="onSubmit">
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

                <div class="relative z-0 w-full mb-10 text-gray-500 capitalize">
                  <select v-model="state" class="capitalize" name="estado" required>

                    <option disabled value="" selected v-if="estadoList.length === 0">Cargando lista ...</option>

                    <option v-else v-for="option in estadoList" :value="option.toponymName" :key="option.geonameId">
                      {{ option.toponymName }}
                    </option>

                  </select>
                  
                  <label for="state" class="origin-0">Estado</label>
                  <ErrorMessage :err="errors.state"/>
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
            </form> -->
        </div>
    </div>
</template>

<style scoped lang='scss'>

</style>