<script lang="ts" setup>
  import { ref } from 'vue';
  import SidebarDropdown from '@/components/sidebar/DropDown.vue';
  // import SidebarLink from '@/components/sidebar/LinkVue.vue';
  import userCard from '../commons/userCard.vue';
  import { useMainStore } from '@/stores/mainStore';
  const mainStore = useMainStore();
  const emits = defineEmits<{
    (event:'OnToggleSidebar',is_spanded:boolean ):void
  }>();

  const is_spanded = ref(false);

  const normalLinks = [
    { to: 'dashboard',    name:'inicio',   icon:'home'                  },
    { to: 'add-case' ,    name:'añadir',   icon:'post_add'              },
    { to: 'list'     ,    name:'casos' ,   icon:'description'           },
  ];

  const auditorLinks = [
    { to: 'dashboard',    name:'inicio',   icon:'home'                  },
    { to: 'add-case' ,    name:'añadir',   icon:'post_add'              },
    { to: 'list'     ,    name:'casos' ,   icon:'description'           },
    { to: 'report-maker', name:'reportes', icon:'content_paste_search'       }
  ];

  const adminLinks = [
    { to: 'signin'     , name:'registro'  , icon:'person_add'       },
    { to: 'management' , name:'gestion'   , icon:'manage_accounts'  },
  ];

  const toggleMenu = () => {
    is_spanded.value = !is_spanded.value ;
    emits('OnToggleSidebar',is_spanded.value);
  }
  
  const spandDropdown = () => { 
    if(is_spanded.value == false) toggleMenu();
  }
</script>

<template>
  <aside :class="{ is_spanded:is_spanded }">
    <img src="@/assets/imgs/logosidebar.svg" alt="" class="logosidebar">
    <!-- Toggle button -->
    <button 
      id="toggle-wrap"  
      class="absolute w-6 h-6 -right-2 top-20 z-100 shadow-md rounded-full material-symbols-outlined text-[18px] transition duration-700 ease-out hover:-translate-x-1 bg-secondary text-primary" 
     
      @click="toggleMenu">
      chevron_right
    </button>

    <!--menu options-->
    <div class="menu max-h-[65%]  overflow-y-auto" :class="{'px-[1rem]':is_spanded}">
      <!-- <SidebarLink title="Inicio" icon="Home" :is_spanded="is_spanded" :link="HomeLink"/> -->
      <SidebarDropdown 
        title="Casos" 
        icon="plagiarism" 
        :links="normalLinks" 
        :is_spanded="is_spanded" 
        @in-focus="spandDropdown"
        v-if="mainStore.logedUser.rol === 'normal'"/>

      <SidebarDropdown 
        title="Casos" 
        icon="plagiarism" 
        :links="auditorLinks" 
        :is_spanded="is_spanded" 
        @in-focus="spandDropdown" 
        v-if="mainStore.logedUser.rol === 'auditor' || mainStore.logedUser.rol === 'admin'"/>

      <SidebarDropdown 
        title="Gestion" 
        icon="manage_accounts" 
        :links="adminLinks" 
        :is_spanded="is_spanded" 
        @in-focus="spandDropdown" 
        v-if="mainStore.logedUser.rol === 'admin'"/>
    </div>
    <!--user config-->
    <div class="mt-auto mb-5">
      <userCard :is_spanded="is_spanded" class="cursor-pointer"/>
    </div>

      

  </aside>
</template>

<style lang="scss">
aside{
  @apply flex flex-col relative p-[1rem] text-secondary bg-blue-950 rounded-tr-3xl;//aca se controla el color de texto base de toda la barra
  width: calc(4rem + 30px);
  transition: 0.3s ease-out;
  
  @media (max-width: 768px){
    position: fixed;
    z-index: 99;
    min-height: 100vh;
  }

  h3, .menu-item .menu-text,.desplegable-icon {
    opacity: 0;
    z-index: -999;
    transition: 0.2s ease-out;
  }
  .menu::-webkit-scrollbar{
    display: none; 
    // permite que se vea o no la barra de scroll en la barra de navegacion
  }
  .menu {
    margin: 0 -1rem;
    @apply mt-28;
    
    .menu-item {
      @apply flex items-center relative rounded-sm; 
      padding: 0.5rem 2rem;
      transition: 0.2s ease-out;
      &:hover{
        @apply text-white bg-secondary rounded-sm
      }
    }
    .material-symbols-sharp { 
      @apply text-[2rem];
      transition: 0.2s ease-out;
    }
    .menu-text {
      @apply ml-3;
      transition: 0.2s ease-out;
    }

  }

  &.is_spanded {
    width: var(--sidebar-width);
    @apply text-secondary ;

    .logosidebar{
      @apply w-48 h-48 mx-auto;
      transition: 0.5s ease-out;
    }
    .menu::-webkit-scrollbar{
      display: block;
    }
    .menu{
      @apply mt-24;
    }
    #toggle-wrap {
      transform: rotate(-180deg);
    }
    h3, .menu-item .menu-text,.desplegable-icon {
      opacity: 1;
      z-index: 999;
    }
    .menu-item {
      @apply rounded-md;
      &:hover {
        @apply text-primary bg-secondary rounded-md
      }
    }
    .material-symbols-sharp { 
      @apply text-[2rem];
    }
    .logout-icon { 
      @apply order-2;
    }
    .user-card-text {
      visibility: visible;
    }
    .menu-list {
       @apply left-0 mt-0;
    }
    .logout-icon{
      @apply text-white;
    }
  }
  .user-card-text {
    visibility: hidden;
  }
}
</style>