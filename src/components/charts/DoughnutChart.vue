<script setup lang="ts">
  import { computed } from "vue";
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  import { Doughnut } from 'vue-chartjs';

  const props = defineProps<{
    title:String,
    data: Array<number>
    labels: Array<string>
  }>();

  // Define el tipo DeepPartial
  type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

  const data = {
    labels: props.labels,
    datasets: [
      {
        backgroundColor: ['#0071BC', '#662D91', '#29ABE2', '#1B1464'],
        data: props.data
      }
    ]
  };

  // Utiliza DeepPartial para las opciones
  const options: DeepPartial<typeof Doughnut['options']> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        align: 'start',
      },
    },
  };

  // Registra los elementos necesarios
  ChartJS.register(ArcElement, Tooltip, Legend);
</script>

<template>
  <div class="w-full h-full">
    <Doughnut :data="data" :options="options"/>
  </div>
</template>

<style scoped lang="scss">
/* Estilos personalizados aquí */
</style>