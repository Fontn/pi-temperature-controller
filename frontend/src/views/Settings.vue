<template>
  <div class="settings">
    <h1>This is the settings page</h1>
    <h2>Sensors:</h2>
    <div class="sensor" v-for="sensor in settings.sensors" v-bind:key="sensor.sensor">
      <h3>{{ sensor.name }} ({{ sensor.sensor }})</h3>
      Name:
      <input type="text" v-model="sensor.name">
      <button v-on:click="updateSensorName(sensor)">Save Name</button>
    </div>
    <h2>Outputs:</h2>
    See: <router-link to="/outputs">Outputs</router-link>
    <h2>Jobs:</h2>
    <Jobs
      :settings="settings"
      :colors="colors"
    />
    <div class="options">
      <h2>Options</h2>
      <div class="options-list">
        <button v-on:click="toogleColors">Toggle Dark/Light Mode</button>
        <button v-on:click="changeJobsUpdateRate()">Change Jobs Update Rate</button>
        <button v-on:click="removeLogs()">Remove Logs</button>
        <button v-on:click="resetSensors()">Reset Sensors</button>
        <button v-on:click="removeHistory()">Remove History</button>
      </div>
    </div>
    <template v-if="loading">
      <Loading/>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

// import ConditionItem from '@/components/ConditionItem.vue'
import Jobs from '@/components/Jobs.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Settings',
  data () {
    return {
      loading: false,
      darkMode: false
    }
  },
  components: {
    Jobs,
    Loading
  },
  props: {
    settings: Object,
    colors: Object
  },
  computed: {
    sensorNames () {
      const names = {}
      if (!this.settings) {
        return names
      }
      if (!this.settings.sensors) {
        return names
      }
      this.settings.sensors.forEach((sensor) => {
        names[sensor.sensor] = sensor.name
      })
      return names
    }
  },
  methods: {
    toogleColors () {
      if (this.darkMode) {
        this.colors.primary = '#435390'
        this.colors.secondary = '#7A7760'
        this.colors.font = '#424242'
        this.colors.bg = '#ddd'
        this.colors.fg = '#eee'
        this.colors.heading = '#292922'
        this.darkMode = false
      } else {
        this.colors.primary = '#bebe64'
        this.colors.secondary = '#969896'
        this.colors.font = '#cfcfcf'
        this.colors.bg = '#131313'
        this.colors.fg = '#1f1f1f'
        this.colors.heading = '#ffffff'
        this.darkMode = true
      }
    },
    async updateSensorName (sensor) {
      this.loading = true
      const { data } = await axios.put(`${process.env.VUE_APP_BACKEND_URL}/settings/sensor`, sensor)
      this.loading = false
      if (data.error) {
        console.log(data)
      } else {
        sensor = data
      }
    },
    async changeJobsUpdateRate () {
      if (confirm('UPDATE ALL JOBS UPDATE RATE\n\nYou are about to change how often all jobs are runned on the server, The server will have to be restarted for this change to take effect.\n\nIf ready hit OK, and a promt with input will apear.')) {
        const userInput = prompt(`UPDATE ALL JOBS UPDATE RATE\n\nEnter the desired update rate in whole minutes\nMinimum: 1, Maximum: 60\nCurrent amount:${this.settings.updateFrequency}\n\nThe server will have to be restarted for this change to take effect.`, this.settings.updateFrequency)
        if (!userInput) {
          return
        }
        this.loading = true
        const { data } = await axios.put(`${process.env.VUE_APP_BACKEND_URL}/settings/update-frequency`, { updateFrequency: Number(userInput) })
        this.loading = false
        if (data.error) {
          console.log(data)
        } else {
          this.settings.updateFrequency = data.updateFrequency
        }
      }
    },
    async resetSensors () {
      if (confirm('RESET SENSORS\nYou are about to reset all sensors. This means removing all sensors and recreating them based on the detected sensors.\nAll sensor names will be removed, jobs will continue to function if its sensors are still connected\n\nIf your ready hit OK.')) {
        this.loading = true
        const { data } = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/settings/reset-sensors`)
        this.loading = false
        if (data.error) {
          console.log(data)
        } else {
          this.settings.sensors = data
        }
      }
    },
    async removeLogs () {
      if (confirm('CLEAR LOGS\n\nYou are about to remove all data from the log. This means that the Temperatue Chart on the home page will be empty for a while.\n\nIf your ready hit OK.')) {
        this.loading = true
        const { data } = await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/temp`)
        this.loading = false
        if (data.error) {
          console.log(data)
        } else {
        }
      }
    },
    async removeHistory () {
      if (confirm('CLEAR HISTORY\n\nYou are about to clear the Histoty. This means that the servers log files will be completely emtied.\nThe min/max values will be gone and the History page will be empty.\n\nIf your are 100% sure you whant this, press OK.') &&
          confirm('CLEAR HISTORY\n\nThis is not revertable, so heres a last chance to turn back.\n\nIf your are 100% sure you whant this, press OK.')) {
        this.loading = true
        const { data } = await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/temp/history`)
        this.loading = false
        if (data.error) {
          console.log(data)
        } else {
        }
      }
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  padding: 0.25em;
}
.sensor {
  margin: 0.5em;
  padding: 1em;
  background-color: var(--fg-color);
  display: inline-block;
}
button {
  background-color: var(--fg-color);
  color: var(--font-color);
  font-family: 'Fonten';
  outline: none;
  border-width: 0.1em;
}
.options-list button {
  position: relative;
  font-size: 1em;
  margin: 1em;
  padding: 1em;
  background-color: var(--fg-color);
  display: inline-block;
}
.sensors {
  padding: 1em;
  margin: 0.5em;
  background-color: var(--fg-color);
}
input {
  background-color: var(--fg-color);
  color: var(--font-color);
  font-family: 'Fonten';
  outline: none;
  border-width: 0.1em;
}
</style>
