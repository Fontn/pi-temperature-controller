<template>
  <div class="history">
    <div class="chartbox">
      <h1>History Chart</h1>
      <ChartContainer :colors="colors" :chartData="fullData" :deviceNames="deviceNames"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import ChartContainer from '@/components/ChartContainer.vue'

export default {
  name: 'History',
  props: {
    settings: Object,
    colors: Object
  },
  components: {
    ChartContainer
  },
  data () {
    return {
      fullData: []
    }
  },
  computed: {
    deviceNames: function () {
      const deviceNames = []
      if (!this.settings) {
        return deviceNames
      } else if (!this.settings.sensors) {
        return deviceNames
      }
      this.settings.sensors.forEach((sensor) => {
        deviceNames.push({ id: sensor.sensor, name: sensor.name })
      })
      return deviceNames
    }
  },
  async created () {
    const { data } = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/temp/history`)
    this.fullData = data
  }
}
</script>

<style scoped>
.chartbox {
  padding: 1em;
  margin: 0.5em;
  background-color: var(--fg-color);
}
</style>
