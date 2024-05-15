<template>
  <div class="home">
    <Sensors :sensors="sensors"/>
    <div class="chartbox">
      <h1>Temperature Chart</h1>
      <ChartContainer :colors="colors" :chartData="fullData" :zoom="zoom" :deviceNames="deviceNames"/>
      <label>Zoom:</label><input type="range" min="0" max="99" v-model="zoomInput">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

import Sensors from '@/components/Sensors.vue'
import ChartContainer from '@/components/ChartContainer.vue'

export default {
  name: 'Home',
  props: {
    settings: Object,
    colors: Object
  },
  components: {
    Sensors,
    ChartContainer
  },
  data () {
    return {
      sensors: [],
      fullData: [],
      zoomInput: 40
    }
  },
  computed: {
    zoom: function () {
      return 100 - Number(this.zoomInput)
    },
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
      this.settings.outputs.forEach((output) => {
        deviceNames.push({ id: output.bcm, name: output.name })
      })
      return deviceNames
    }
  },
  async created () {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/temp/current`)
    this.sensors = response.data.sensors
    this.sensors.forEach((sensor) => {
      const settingsSensor = this.settings.sensors.find(s => s.sensor === sensor.sensor)
      if (settingsSensor) {
        sensor.name = settingsSensor.name
      } else {
        sensor.name = sensor.sensor
      }
    })
    const { data } = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/temp`)
    data.forEach((item) => {
      const date = new Date(Date.parse(item.date))
      const dateArray = date.toTimeString().split(':')
      item.date = [dateArray[0], dateArray[1]].join(':')
    })
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
