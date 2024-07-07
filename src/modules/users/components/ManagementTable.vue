<script setup lang='ts'>
    import { defineAsyncComponent, ref, reactive } from 'vue';
    import { useDataTable } from "@/composables/useDataTble";
    import type { User } from '@/interfaces/userInterfaces';
    import { useUserStore } from "@/modules/users/store/userStore";
    const ManagUserCard = defineAsyncComponent(() => import('@/modules/users/components/ManagUserCard.vue'));
    const PaginationBar = defineAsyncComponent(() => import('@/components/table/PaginationBar.vue'));
    const UpdateUserComponent = defineAsyncComponent(() => import('@/modules/users/components/ManagmentUpdate.vue'));
    //this protery handle the show modal
    const showModal = ref(false);
    //this property is for send the userdID  as and property
    let user = reactive({} as User);
    const userStore = useUserStore();
    const props = defineProps<{
      data:[User],
      perpage:number,
      pages:number
    }>();

    const { 
        pages,
        visiblePages,
        getDataPagination,
        getPreviusPage,
        getNextPage
    } = useDataTable(props.data,props.perpage,props.pages);
    
    const nextPage = () =>{
      //desde estas funciones se valida si el total de paginas el posible incrementar o decrementar y en dado caso se llama a la function de composable get next page luego se modifica la pagina en el store y luego se setea la nueva lista de users en el store para que asi se modifique la tabla 
      if(userStore.page <= userStore.totalPages ){
        getNextPage();
        userStore.NextPage();
        userStore.setUserList();
      }
      
    }
    const prevPage = () =>{
      if(userStore.totalPages > 1){
        getPreviusPage();
        userStore.PrevPage();
        userStore.setUserList();
      }
    }
    const handleUserUpdate = (userParam:User) => {
      user = userParam;
      showModal.value =  true;
    }

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
                    Numero
                </p>
            </div>
        </div>
        <!-- LOOP FOR USERS DATA-->
        <div class="w-full h-[70%] overflow-y-auto scrollbar-hidden"> 
            <div v-for="elm in userStore.getUserList" :key="elm['_id']">
                <ManagUserCard :rol="elm['rol']" :name="elm['name']"  :phoneNumber="elm['phoneNumber']" class="hover:bg-primary-light hover:bg-opacity-10 hover:cursor-pointer" @click="handleUserUpdate(elm)"/>
            </div>
            
        </div>
        <div class="h-[15%] w-full bg-primary-light bg-opacity-80">
            <PaginationBar 
                class="w-full h-full border px-2"
                :pages="pages" 
                :visible-pages="visiblePages"
                :elementsPerPage="10"
                :results="props.data.length"
                @dataPagination="getDataPagination"
                @prevPage="prevPage"
                @nextPage="nextPage"
            />
        </div>

        <!-- component with mODAL FOR USER UPDATES -->
        <UpdateUserComponent :show-modal="showModal" :userToupdate="user"  @close-modal="showModal = false"/>
    </div>
</template>

<style scoped lang='scss'>
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
</style>