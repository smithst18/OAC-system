<script setup lang="ts">  
  const props = defineProps<{
      date:string,
      description:string,
      caseStatus:string,
  }>();
</script>

<template>
    <div> 
        <div class="w-[620px] px-5 py-5" v-if="props.date && props.description" >
          <div class="w-5/6">
            <p>
              Fecha : 
              <span class="text-primary text-opacity-75 underline underline-offset-1">
                {{ props.date }} 
              </span>
            </p>
            <p>
              Estado de la solicitud : 
              <span class="text-primary text-opacity-75 underline underline-offset-1">
                {{ props.caseStatus }} 
              </span>
            </p>
            <p class="w-full break-words text-justify">{{ props.description }}</p>
          </div>
        </div>
    </div>
</template>
 
<style scoped lang="scss">

</style>