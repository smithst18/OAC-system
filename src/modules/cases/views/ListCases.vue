<script setup lang="ts">
  import { defineAsyncComponent, ref } from "vue";

  const InforBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const DataTable = defineAsyncComponent(() => import("@/components/table/DataTable.vue"));
  const CaseDiary = defineAsyncComponent(() => import('@/components/commons/GenericModal.vue'));
  const showModal = ref(false)
  const data = [
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "132",
            rol: "tecnico",
            conection: "fecha 123"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "312",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "r12",
            name: "nombre",
            entity: "administracion",
            rol: "administrador",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/1/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "s",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "9",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "5",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "4",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "3",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "3",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "2",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        {
            icono: "ruta/al/icono",
            name: "nombre",
            entity: "administracion",
            rol: "tecnico",
            conection: "fecha aleatoria"
        },
        
        
  ];
  const titles : Array < string > = [
        'titulo 1',
        'titulo 2',
        'titulo 3',
        'titulo 4',
        'titulo 5',
  ]
  const on_picked_element = (elm:string) => {
    console.log(elm);
    showModal.value = true;
  }
</script>

<template>
    <div class="w-full h-full">

        <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
            <InforBar class="text-gray-400"/>
        </div>

        <h1 class="text-3xl text-white uppercase my-10">
            Casos Generales
        </h1>

        <div class="w-full h-[80%]">
            <DataTable :titles="titles" :data="data" :elements-per-page="5" @picked-element="on_picked_element"/>
        </div>

        <!-- mODAL FOR USER UPDATES -->
        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <CaseDiary :show-modal="showModal" @close-modal="showModal = false">
                <template #header>
                    <h3>AQUI EL NUMERO DEL CASO</h3>
                </template>
                <template #body>
                    <h3>AQUI VA LA INFO DEL CASO</h3>
                </template>
                <template #footer>
                    <h3>aQUI VAN LAS ANOTACIONES DIARIAS </h3>
                </template>
            </CaseDiary>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
    
</style>