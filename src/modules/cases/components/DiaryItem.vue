<script setup lang="ts">  
  const props = defineProps<{
      date:string,
      description:string
  }>();
</script>

<template>
    <div> 
        <div class="w-[620px] px-5 py-5" v-if="props.date && props.description" >
          <div class="w-full flex items-end">
            <p>
              Fecha : 
              <span class="text-primary text-opacity-75 underline underline-offset-1">
                {{ props.date }} 
              </span>
            </p>
          </div>
          <p class="w-full break-words text-justify">{{ props.description }}</p>
        </div>
    </div>
</template>
 
<style scoped lang="scss">

</style>