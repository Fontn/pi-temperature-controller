<template>
  <div class="chartcontainer">
    <LineChart
      v-if="chartData.length > 0"
      :options="options"
      :data="chartData"
      :colors="colors"
      :zoom="zoom"
      :deviceNames="deviceNames"
    />
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'ChartContainer',
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 16,
              fontColor: this.colors.font
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 16,
              fontColor: this.colors.font
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontSize: 16,
            fontColor: this.colors.font
          }
        },
        tooltips: {
          mode: 'label'
        }
      }
    }
  },
  components: {
    LineChart
  },
  props: {
    colors: Object,
    chartData: Array,
    zoom: Number,
    deviceNames: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
