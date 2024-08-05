<script setup lang='ts'>
  import { defineAsyncComponent,onMounted, onUnmounted, ref, watch } from 'vue';
  import { useUserStore } from "@/modules/users/store/userStore";
  const ManagementTable = defineAsyncComponent(() => import("@/modules/users/components/ManagementTable.vue"));
  const InfoBar = defineAsyncComponent(() => import("@/components/commons/InfoBar.vue"));
  const SearchBar =  defineAsyncComponent(() => import("@/components/commons/SearchBar.vue"));
  const UserBar = defineAsyncComponent(() => import("@/components/commons/UserBar.vue"));
  const userStore = useUserStore();
  const dataToSearch = ref("");

  const searchData = (data:string) => {
    dataToSearch.value = data;
  }

  watch( dataToSearch, async (newData, oldData) =>{
    if(dataToSearch.value === ""){
      console.log("no se ha buscado nada");
    }else{
      console.log("buscando valores");
    }
  });

  onMounted(async () => {
    try{
      const resp = await userStore.setUserList();
      console.log(resp);
    }catch(e){
      console.log(e);
    }
  }); 
  onUnmounted(() => {
    userStore.$reset();
  });
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-white shadow-md rounded-2xl w-full h-[8%]">
      <InfoBar class="text-gray-400"/>
    </div>
    <div class="flex items-center">
      <UserBar/>
      <SearchBar class="w-[20%] h-[5%] ml-auto" @on-search-data="searchData"/>
    </div>
    <div class="bg-white text-primary-light shadow-md  rounded-2xl w-full h-[80%] py-5 px-5" v-if="userStore.getTotalPages != 0">
      <ManagementTable :data="userStore.getUserList" :perpage="userStore.getPerPages" :pages="userStore.getTotalPages" />
      <p v-if="userStore.getTotalPages < 1">Cargando data ...</p>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>