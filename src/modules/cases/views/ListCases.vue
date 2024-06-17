<script setup lang="ts">
  import { defineAsyncComponent } from "vue";

  const InforBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const DataTable = defineAsyncComponent(() => import("@/components/table/DataTable.vue"));
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
  const on_picked_element = () => {
    console.log('hola');
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
            <DataTable :titles="titles" :data="data" :elements-per-page="5" :on-picked-element="on_picked_element"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>