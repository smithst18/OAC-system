<script setup lang="ts">
  import { computed } from "vue";
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { Bar } from 'vue-chartjs';

  type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

  const props = defineProps<{
    title: String,
    data: Array<number>,
    labels: Array<string>
  }>();

  const totalValue = computed(() => {
    return props.data.reduce((acumulador, valorActual) => {
      return acumulador + valorActual;
    }, 0);
  });

  const datas = {
    labels: props.labels,
    datasets: [
      {
        label: 'Casos por mes',
        data: props.data,
        backgroundColor: "#0B2D4E",
        borderWidth: 1,
        borderRadius: 20,
      }
    ]
  };

  const options: DeepPartial<typeof Bar['options']> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `${props.title}, total: ${totalValue.value}`,
        padding: {
          top: 10,
          bottom: 30
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true, // Muestra las líneas de división en el eje X
          drawOnChartArea: false, // Evita que las líneas se superpongan a las barras
          drawTicks: false, // No muestra las marcas de los ticks
          borderColor: 'green',
          color: 'green',
        },
      },
      y: {
        grid: {
          display: true, // Muestra las líneas de división en el eje X
          drawOnChartArea: false, // Evita que las líneas se superpongan a las barras
          drawTicks: false, // No muestra las marcas de los ticks
          borderColor: 'blue',
          color: 'blue',
        }
      }
    }
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
</script>

<template>
  <div class="w-full h-full">
    <Bar :data="datas" :options="options"/>
  </div>
</template>

<style scoped lang="scss">

</style>
