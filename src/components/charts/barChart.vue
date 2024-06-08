<script setup lang="ts">
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { Bar } from 'vue-chartjs';
  import { type NumericArrayProp } from '@/interfaces/chartInterfaces';
  type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

  const props = defineProps<{
    title:String,
    data:NumericArrayProp
  }>();
  
  const datas = {
    labels:["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        label: 'Casos por mes',
        data: props.data as (number | [number, number] | null)[], //However, Chart.js expects the data property in the datasets object to be an array of numbers, arrays of two numbers (representing x and y coordinates), or null values. to fixed this error we use  "as (number | [number, number] | null)[]," in the expected array data
        backgroundColor: (ctx: any) => {
          const canvas = ctx.chart.ctx;
          const gradient = canvas.createLinearGradient(0, 0, 0, canvas.canvas.height); // Adjust for vertical gradient

          gradient.addColorStop(0, 'rgba(21, 22, 100, 1)'); // Start color
          gradient.addColorStop(0.14, 'rgba(125, 5, 109, 1)'); // Middle color
          gradient.addColorStop(1, 'rgba(0, 212, 255, 1)'); // End color

          return gradient;
        },
        borderWidth: 1,
        borderRadius: 20,
      }
    ]
  }

  const options : DeepPartial<typeof Bar['options']> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display:false
      },
      title: {
        display: true,
        text: props.title,
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
  }

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
</script>

<template>
  <div class="w-full h-full">
    <Bar :data="datas" :options="options"/>
  </div>
</template>
 
<style scoped lang="scss">

</style>