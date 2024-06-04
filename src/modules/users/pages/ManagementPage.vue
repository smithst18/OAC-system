<script setup lang='ts'>
    import { defineAsyncComponent, onMounted, computed, ref } from 'vue';
    import { useDataTable } from "@/composables/useDataTble";
    const ManagUserCard = defineAsyncComponent(() => import('@/modules/users/components/ManagUserCard.vue'));
    const PaginationBar = defineAsyncComponent(() => import('@/components/table/PaginationBar.vue'));
    const UpdateUserModal = defineAsyncComponent(() => import('@/components/commons/GenericModal.vue'));
    const users = [
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
            entity: "administracion",
            rol: "administrador",
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
        
        
    ];
    const { 
        paginatedData,
        pages,
        actualPage,
        visiblePages,
        getDataPagination,
        getPreviusPage,
        getNextPage
    } = useDataTable(users,10);
    // const results =  computed(() => 40 /** tama;o dela rray de data */);
    const prueba = () => {
        alert('hola mundo desde el usuario selccionado')
    }
    const showModal = ref(false)
    onMounted(() => getDataPagination(actualPage.value));
</script>

<template>
    <div class="w-full h-full">
        <!--INFORMATION INDEX FOR USER TABLE-->
        <div class="w-full h-[15%] grid grid-cols-4">
            <div class="col-span-1 border">

                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        person
                    </span>
                    Perfil
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        person_book
                    </span>
                    Nombre
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        user_attributes
                    </span>
                    Rol
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        schedule
                    </span>
                    Status
                </p>
            </div>
        </div>
        <!-- LOOP FOR USERS DATA-->
        <div class="w-full h-[70%] overflow-y-auto scrollbar-hidden"> 
            <div v-for="elm in paginatedData" :key="elm">
                <ManagUserCard rol="tecnico" class="hover:bg-primary-light hover:bg-opacity-10 hover:cursor-pointer" @click="showModal = true"/>
            </div>
            
        </div>
        <div class="h-[15%] w-full border">
            <PaginationBar 
                class="w-full h-full border px-2"
                :pages="pages" 
                :visible-pages="visiblePages"
                :elementsPerPage="10"
                :results="users.length"
                @dataPagination="getDataPagination"
                @prevPage="getPreviusPage"
                @nextPage="getNextPage"
            />
        </div>

        <!-- mODAL FOR USER UPDATES -->
        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <UpdateUserModal :show-modal="showModal" @close-modal="showModal = false">
                <template #header>
                    <h3>custom header</h3>
                </template>
                <template #body>
                    <h3>custom body</h3>
                </template>
                <template #footer>
                    <h3>custom footer</h3>
                </template>
            </UpdateUserModal>
        </Teleport>
    </div>
</template>

<style scoped lang='scss'>
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
</style>