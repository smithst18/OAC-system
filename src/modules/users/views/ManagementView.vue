<script setup lang='ts'>
  import { defineAsyncComponent,onMounted, ref, watch } from 'vue';
  import { useUserStore } from "@/modules/users/store/userStore";
  import type { User } from '@/interfaces/userInterfaces';
  const ManagementTable = defineAsyncComponent(() => import("@/modules/users/components/ManagementTable.vue"));
  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const SearchBar =  defineAsyncComponent(() => import("@/components/commons/SearchBar.vue"));
  const userStore = useUserStore()
  const dataToSearch = ref("");
  const searchData = (data:string) => {
    dataToSearch.value = data;
  }
  const data = ref<User[]>([]);
  const perpage = ref(0);
  const pages = ref(0);

  watch( dataToSearch, async (newData, oldData) =>{
    if(dataToSearch.value === ""){
      console.log("no se ha buscado nada");
    }else{
      console.log("buscando valores");
    }
  })
  onMounted(async () => {
    const resp = await userStore.setUserList();
  }); 
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
      <InfoBar class="text-gray-400"/>
    </div>
    <div class="flex items-center">
      <h1 class="text-3xl text-white uppercase my-10">Hola, Keyla Goncalves</h1>
      <SearchBar class="w-[20%] h-[5%] ml-auto" @on-search-data="searchData"/>
    </div>
    <div class="bg-white text-primary-light shadow-md  rounded-2xl w-full h-[80%] py-5 px-5">
      <ManagementTable :data="userStore.getUserList" :perpage="userStore.getPerPages" :pages="userStore.getTotalPages" />
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>