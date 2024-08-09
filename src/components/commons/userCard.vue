<script setup lang='ts'>
  import { useMainStore } from '@/stores/mainStore';

  const props = defineProps<{
      is_spanded:boolean,
      icon?:string,
  }>();
  const mainStore = useMainStore();
  const { logOut } = mainStore;

</script>

<template>
    <div class="flex items-center w-full h-full"> 
        <!-- USER ICON-->
        <div class="rounded-full overflow-hidden flex bg-secondary shadow-lg hover:opacity-70" :class="[
            { 'w-10' : props.is_spanded   },
            { 'h-10' :props.is_spanded   },
            { 'mr-4' :props.is_spanded   },
            { 'mx-auto' : !props.is_spanded   },
            { 'w-8'  : !props.is_spanded   },
            { 'h-8'  : !props.is_spanded   },

        ]">
            <span class="material-symbols-outlined text-white object-cover flex m-auto rounded-full">
              person
            </span>
            <!-- <img src="#" alt="" class="object-cover flex m-auto rounded-full" :class="[
            { 'w-7' : props.is_spanded   },
            { 'h-7' : props.is_spanded   },
            { 'w-5'  : !props.is_spanded   },
            { 'h-5'  : !props.is_spanded   },

            ]"> -->
        </div>
        <!-- USER NAME-->
        <div class="flex justify-center items-center">
          <div class="max-w-[150px] w-[150px] truncate text-white text-center mr-3" v-if="props.is_spanded">
              {{ mainStore.logedUser.name }}
          </div>
          <p class="material-symbols-outlined mr-3 text-lg cursor-pointer ml-auto text-white" v-if="is_spanded" @click="logOut">logout</p>
        </div>
    </div>
</template>
<style scoped lang="scss">
    
</style>