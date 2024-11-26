<script setup lang='ts'>
    import type { User } from '@/interfaces/userInterfaces';
    import { defineAsyncComponent, ref, reactive } from 'vue';
    import { useDataTable } from "@/composables/useDatatable";
    import { useUserStore } from "@/modules/users/store/userStore";
    import { useMainStore } from '@/stores/mainStore';
    const ManagUserCard = defineAsyncComponent(() => import('@/modules/users/components/ManagUserCard.vue'));
    const PaginationBar = defineAsyncComponent(() => import('@/components/table/PaginationBar.vue'));
    const UpdateUserComponent = defineAsyncComponent(() => import('@/modules/users/components/ManagmentUpdate.vue'));
    //this protery handle the show modal
    const showModal = ref(false);
    //this property is for send the userdID  as and property
    let user = reactive({} as User);
    const userStore = useUserStore();
    const mainStore = useMainStore();
    
    const props = defineProps<{
      data:any,
      perpage:number,
      pages:number
    }>();

    const { 
      activeIndex,
      nextPage,
      setDataPagination,
      prevPage,
    } = useDataTable(1);
    
    const setNextPage = async () =>{
      nextPage(async () => await userStore.setUserList());
    }

    const setDataPaginations = async (page:number) => {
      setDataPagination(page,async () => await userStore.setUserList())
    }

    const setPrevPage = async() =>{
      prevPage(async () => await userStore.setUserList());
    }

    const handleUserUpdate = (userParam:User) => {
      user = userParam;
      showModal.value =  true;
    }

</script>

<template>
    <div class="w-full h-full">
        <!--INFORMATION INDEX FOR USER TABLE-->
        <div class="w-full h-[15%] grid grid-cols-5">
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
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        schedule
                    </span>
                    Estado
                </p>
            </div>
        </div>
        <!-- LOOP FOR USERS DATA-->
        <div class="w-full h-[70%] overflow-y-auto scrollbar-hidden"> 
          <div v-if="userStore.getUserList.length < 1">
            <p class="text-green-500">Cargando data</p>
          </div>
          <div v-for="elm in userStore.getUserList" :key="elm['_id']" v-else>
              <ManagUserCard :rol="elm['rol']" :name="elm['name']"  :phoneNumber="elm['phoneNumber']" :state="elm['state']" class="hover:bg-primary-light hover:bg-opacity-10 hover:cursor-pointer" @click="handleUserUpdate(elm)"/>
          </div>
            
        </div>
        <div class="h-[15%] w-full bg-primary-light bg-opacity-80">
            <PaginationBar 
                class="w-full h-full border px-2"
                :totalpages="mainStore.getTotalPages" 
                :visible-pages="mainStore.getTotalPages"
                :elementsPerPage="30"
                :results="props.data.length"
                :active-index="activeIndex"
                @dataPagination="setDataPaginations($event)"
                @prevPage="setPrevPage"
                @nextPage="setNextPage"
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