<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import type { Link } from '@/interfaces/sidebarInterface';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const props = defineProps<{
    icon: string,
    title: string,
    links: Array<Link>,
    is_spanded: boolean
  }>();

  //this property allows the navbar father element change is own color when the main rout is active
  const isActive = computed(() =>{
    let rut = route.path.split('/');
    // console.log(rut);
    return rut[1] == props.title.toLowerCase() ? true : false
  })

  
  const emit = defineEmits<{
      (event:'inFocus'):void,
  }>();

  const list_is_spanded = ref(false);
  const toggleList = () => list_is_spanded.value = !list_is_spanded.value;
</script>

<template>
  <div @click="emit('inFocus')" class="pb-2 cursor-pointer">
    <div class="menu-item" @click="toggleList" :class="{'text-primary bg-secondary': isActive}"> <!--:class="{'bg-primary text-secondary': list_is_spanded}"-->
      <span class="material-symbols-sharp">{{ props.icon }}</span>
      <span class="menu-text capitalize">{{ props.title }}</span>
      <span 
        class="ml-auto material-symbols-outlined desplegable-icon transition duration-900 ease-out"
        :class="{'toggle-wrap-icon': list_is_spanded}"
        >chevron_right</span>
    </div>
    <transition name="submenu">
      <ol class="menu-list" v-if="list_is_spanded && is_spanded">
        <li v-for="link in links" :key="link.name">
          <router-link
            :to="{ name:link.to }"
            v-slot="{ isActive }">
            <div class="flex items-center rounded-md my-2 mx-5 px-6 hover:text-primary hover:bg-secondary" :class="{'text-primary bg-secondary ': isActive}">
              <p class="material-symbols-outlined mr-3 text-lg">{{ link.icon }}</p>
              <p> {{ link.name }} </p>
              <!-- <p class="ml-auto text-xs"> 2 </p> -->
            </div>
          </router-link>
        </li>
      </ol>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.submenu-enter-active,
.submenu-leave-active {
  animation: rotateMenu 400ms ease-in;
}
.submenu-enter-from,
.submenu-leave-to {
  animation: rotateMenu 00ms ease-in;
  opacity: 0;
}
@keyframes rotateMenu {
    0% {
        transform: rotateX(-90deg)
    }
    70% {
        transform: rotateX(20deg) 
    }
    100% {
        transform: rotateX(0deg) 
    }
}
.toggle-wrap-icon {
  transform: rotate(90deg);
}
</style>