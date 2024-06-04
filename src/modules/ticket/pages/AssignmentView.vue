<script setup lang='ts'>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const TicketInfoCard = defineAsyncComponent(() => import('@/modules/ticket/components/TicketInfCard.vue'));

const ticket = {
    id: 15,
    title:"Error en computadora",
    status:"pendiente",
    description:"loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem",
    date: "25-15  08:17",
    requester:"maria gonzales",
    location:"comunicaciones",
    type:"software"

};

</script>

<template>
    <div class="w-full h-full overflow-y-auto"> 
        <TicketInfoCard :ticket="ticket"/>
    </div>
</template>

<style scoped lang='scss'>

</style>