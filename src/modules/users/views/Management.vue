<script setup lang='ts'>
    import { defineAsyncComponent, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    const NavbarComponent = defineAsyncComponent(() => import('@/components/navbar/NavBar.vue'));
    const SearchingBar = defineAsyncComponent(() => import('@/components/commons/SearchBar.vue'));
    const AddButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));
    const router = useRouter();

    onMounted(() => {
        // a tener en cuenta de esta manera no tenemos los params en tiempo real IMPORTANTE
        router.push({ name: 'clients', params: { type: 'usuario' } });
    });
</script>

<template>
    <div class="w-full h-full">
        <div class="h-1/5 pt-8">
            <h1 class="text-2xl font-bold h-2/4">Equipo</h1>
            <div class="h-2/4">
                <NavbarComponent class="pl-5 border-b-2 h-full" :routParams="[{ title:'users', name:'clients', notifications:0, type:'usuario' }]">
                    <template v-slot:extra-element>
                        <div class="flex items-center">
                            <SearchingBar class="mr-5"/>
                            <AddButton :full-size="false" title="Añadir" icon="person_add" @click="$router.push({name:'signin'})"/>
                        </div>
                    </template>
                </NavbarComponent>
            </div>
        </div>
        <div class="h-3/4 mt-5">
            <router-view/>
        </div>
    </div>
</template>

<style scoped lang='scss'>

</style>