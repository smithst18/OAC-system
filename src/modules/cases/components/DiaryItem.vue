<script setup lang="ts">  
  const props = defineProps<{
      date:string,
      description:string
  }>();
</script>

<template>
    <div> 
        <div class="w-[620px] max-h-[220px] px-5 py-5" v-if="props.date && props.description" >
          <div class="w-full flex items-end">
            <p>
              Fecha : 
              <span class="text-primary text-opacity-75 underline underline-offset-1">
                {{ props.date }} 
              </span>
            </p>
            <!-- <div class="ml-auto">
                <span class="material-symbols-outlined text-base mr-2">
                  delete
                </span>
                <span class="material-symbols-outlined text-base">
                  edit
                </span>
              </div> -->
          </div>
          <p class="w-full max-h-[175px] text-wrap truncate">{{ props.description }}</p>
        </div>
    </div>
</template>
 
<style scoped lang="scss">

</style>