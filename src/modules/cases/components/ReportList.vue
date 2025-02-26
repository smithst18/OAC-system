<script setup lang="ts">
const props = defineProps<{
  data:any,
}>();
</script>

<template>
  <div class="w-full h-full">
        <!--INFORMATION INDEX FOR USER TABLE-->
        <div class="w-full h-[15%] grid grid-cols-8">
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                  ID
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        flag
                    </span>
                    Estado
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                      checklist_rtl
                    </span>
                    tipo de Benef
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                      category
                    </span>
                    categoria
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                      priority
                    </span>
                    prioridad
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        male
                    </span>
                    <span class="material-symbols-outlined text-3xl mr-2">
                        female
                    </span>
                    genero
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                      calendar_month
                    </span>
                    edad
                </p>
            </div>
            <div class="col-span-1 border">
                <p class="flex items-center justify-center h-full">
                    <span class="material-symbols-outlined text-3xl mr-2">
                        person
                    </span>
                    analista
                </p>
            </div>
            
        </div>
        <!-- LOOP FOR USERS DATA-->
        <div class="w-full h-[70%] overflow-y-auto scrollbar-hidden"> 
          <div>
            <div v-if="props.data.length < 1">
              <p class="text-green-500">Cargando data</p>
            </div>
            <div v-for="elm in data" :key="elm['_id']" class="w-full h-full" v-else>
              <div class="grid grid-cols-8 capitalize"> 
  
                <div class="col-span-1 border flex">
                  <p class="rounded-lg text-center w-fit px-2 text-sm m-auto mt-2">
                    {{ elm.subId }}
                  </p>
                </div>
                <div class="col-span-1 border text-center">
                  <p class="rounded-lg text-center w-fit px-2 text-sm m-auto mt-2">
                    {{ elm.estado }}
                  </p>
                </div>
                <div class="col-span-1 border">
                  <p class="rounded-lg text-center w-fit px-2 text-sm m-auto mt-2">
                    {{ elm.tipoBeneficiario }}
                  </p>
                </div>
                <div class="col-span-1 border">
                  <p class="text-center mt-2">
                    {{ elm.categoria }}
                  </p>
                </div>
                <div class="col-span-1 border">
                  <p class="text-center mt-2">
                    {{ elm.prioridad }}
                  </p>
                </div>
                <div class="col-span-1 border">
                  <p class="text-center mt-2">
                    {{ elm.genero }}
                  </p>
                </div>
                <div class="col-span-1 border">
                  <p class="text-center mt-2">
                    {{ elm.edad }}
                  </p>
                </div>
                <div class="col-span-1 border">
                  <p class="text-center mt-2">
                    {{ elm.analista }}
                  </p>
                </div>
              </div>
            </div>
          </div>
            
        </div>
        <div class="h-[15%] w-full bg-primary-light text-white bg-opacity-80 flex justify-start items-center p-5">
          <p class="">
            numero de resultados totales : {{ data.length }}
          </p>
        </div>
    </div>
</template>
 
<style scoped lang="scss">
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
</style>