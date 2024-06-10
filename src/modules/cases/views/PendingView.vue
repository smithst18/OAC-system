<script setup lang="ts">
    import { defineAsyncComponent, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useModal } from "@/composables/useModal";
    import { useForm } from 'vee-validate';
    const BaseButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
    const NavbarComponent = defineAsyncComponent(() => import('@/components/navbar/NavBar.vue'));
    const SearchingBar = defineAsyncComponent(() => import('@/components/commons/SearchBar.vue'));
    const FilterButton = defineAsyncComponent(() => import('@/components/commons/FilterButton.vue'));
    const TicketModal = defineAsyncComponent(() => import('@/components/commons/GenericModal.vue'));
    const router = useRouter();
    const { showModal, toggleModal } = useModal(false);
    const { values, defineInputBinds, errors, handleSubmit } = useForm();

    const title = defineInputBinds('title');
    const description = defineInputBinds('description');
    const type = defineInputBinds('type');

    const  onSubmit = handleSubmit ( values => {
        console.log(values)
    });

    onMounted(() => {
        // a tener en cuenta de esta manera no tenemos los params en tiempo real IMPORTANTE
        router.push({ name: 'unAssigned', params: { type: 'unAssigned' } });
    });
</script>

<template>
    <div class="w-full h-full ">
        <!-- TITTLE AND BUTTON FOR CREATE NEW TICKETS -->
        <div class="w-full h-[15%]">
            <div class="flex items-center w-full h-full px-5">
                <h1 class="text-2xl font-bold">Tickets</h1>
                <BaseButton  class="ml-auto" title="Nuevo Ticket" :fullSize="false" @click="toggleModal"/>
            </div>
        </div>
        <!--BOX WITH TICKETS  AND STUFF-->
        <div class="w-full h-[85%] pl-2">
            <!-- navigation bar -->
            <NavbarComponent class="h-[10%] pl-5 border-b-2" :routParams="[{title:'Por asignar',name:'unAssigned',notifications:3,type:'unAssigned'},{title:'asignados',name:'assigned',notifications:2,type:'assigned'}]">
                <template v-slot:extra-element>
                    <div class="flex items-center">
                        <SearchingBar class="mr-5"/>
                        <FilterButton :options="['fecha','tipo']"/>
                    </div>
                </template>
            </NavbarComponent>
            <!-- body -->
            <div class="h-[90%] w-full max-w-max">
                <router-view/>
            </div>
        </div>
        <teleport to='body'>
            <TicketModal :show-modal="showModal" @close-modal="toggleModal">
                <template #header>
                    <div class="flex items-center justify-center w-full h-10 mx-5">
                        <div class="w-8 h-9">
                            <img alt="SGTI_LOGO" id="logo" src="@/assets/imgs/sidebarminilogoazul.webp" class="w-full h-full">
                        </div>
                        <div class="ml-3 text-xl">
                           <h5>Generar ticket nuevo</h5>
                        </div>
                    </div>
                </template>
                <template #body>
                    <div>
                        <form action="" class="mx-5 p-5 flex flex-col w-96">
                            <div class="relative z-0 w-full mb-10">
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder=" "
                                    class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-200"
                                />
                                <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Problema</label>
                            </div>

                            <div class="relative z-0 w-full mb-10">
                                <select
                                    name="type"
                                    required
                                    placeholder=" "
                                    class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-200"
                                >
                                    <option value="value1">Value 1</option>
                                    <option value="value2">Value 2</option>
                                    <option value="value3">Value 3</option>
                                </select>
                                <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Tipo de Problema</label>
                            </div>

                            <div class="relative z-0 w-full mb-10">
                                <textarea
                                    name="description"
                                    required
                                    placeholder=" "
                                    class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-200 max-h-32"
                                ></textarea>
                                <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Descripcion del problema</label>
                            </div>

                            <div class="flex">
                                <BaseButton  class="bg-red-500 hover:bg-red-300 transition ease-in-out delay-75 active:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-24" title="Cancelar" :fullSize="false" @click=""/>
                                <BaseButton  class="ml-auto w-24" title="Aceptar" :fullSize="false" @click="onSubmit"/>
                            </div>
                        </form>
                    </div>
                </template>
                <template #footer>
                    <div class="mx-10 text-center">
                       <span class="text-xs">Se le atendera su caso a la brevedad</span>
                    </div>
                </template>
            </TicketModal>
        </teleport>
    </div>
</template>

<style scoped lang="scss">
.-z-1 {
    z-index: -1;
}

.origin-0 {
  transform-origin: 0%;
}
input:focus ~ label,
  input:not(:placeholder-shown) ~ label,
  textarea:focus ~ label,
  textarea:not(:placeholder-shown) ~ label,
  select:focus ~ label,
  select:not([value='']):valid ~ label {
    /* @apply transform; scale-75; -translate-y-6; */
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    --tw-scale-x: 0.75;
    --tw-scale-y: 0.75;
    --tw-translate-y: -1.5rem;
  }

  input:focus ~ label,
  select:focus ~ label {
    // @apply text-black left-0;
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-text-opacity));
    left: 0px;
  }
</style>