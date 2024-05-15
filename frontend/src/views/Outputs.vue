<template>
  <div class="output">
    <h1>Outputs</h1>
    <div class="outputs" v-for="(output, index) in settings.outputs" v-bind:key="index">
      (BCM {{ output.bcm }}) Name:
      <input type="text" v-model="output.name">
      <button v-on:click="updateOutputName(output)">Save Name</button>
      <button class="remove-button" v-on:click="removeOutput(output)">x</button>
    </div>
    <button v-if="!outputCreator" class="add-button" v-on:click="openOutputCreator()">+</button>
    <div  v-if="outputCreator">
      <Pinout :error="outputCreatorError" v-on:cancel-output-creator="closeOutputCreator" v-on:save-output-creator="createOutput"/>
    </div>
    <template v-if="loading">
      <Loading/>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

import Loading from '@/components/Loading.vue'
import Pinout from '@/components/Pinout.vue'

export default {
  name: 'Outputs',
  data () {
    return {
      loading: false,
      outputCreator: false,
      outputCreatorError: undefined
    }
  },
  components: {
    Loading,
    Pinout
  },
  props: {
    settings: Object,
    colors: Object
  },
  methods: {
    openOutputCreator () {
      this.outputCreator = true
    },
    closeOutputCreator () {
      this.outputCreator = false
      this.outputCreatorError = undefined
    },
    async createOutput (output) {
      if (!output.bcm) {
        this.outputCreatorError = { error: 'No output pin selected', msg: 'No pin was selected. Select one of the GPIO pins on the board.' }
        return
      }
      this.loading = true
      const { data } = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/output`, output)
      this.loading = false
      if (data.error) {
        this.outputCreatorError = data
      } else {
        console.log(data)
        this.settings.outputs.push(data.output)
        this.settings.jobs.push(data.job)
        this.outputCreator = false
      }
    },
    async removeOutput (output) {
      this.loading = true
      const { data } = await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/output`, { data: output })
      this.loading = false
      if (data.error) {
        console.log(data)
      } else {
        console.log(data)
        this.settings.outputs = data
        this.settings.jobs = this.settings.jobs.filter(job => job.output !== output.bcm)
        this.outputCreator = false
      }
    },
    async updateOutputName (output) {
      console.log(output)
      this.loading = true
      const { data } = await axios.put(`${process.env.VUE_APP_BACKEND_URL}/output`, output)
      this.loading = false
      if (data.error) {
        console.log(data)
      } else {
        output = data
        this.outputCreator = false
      }
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: var(--fg-color);
  color: var(--font-color);
  font-family: 'Fonten';
  outline: none;
  border-width: 0.1em;
}
.add-button {
  width: 2em;
  margin: 0.5em;
  padding: 0.25em;
  font-size: 1.5em;
  color: #64be64;
}
.remove-button {
  margin-left: 2em;
  color: #be4424;
}
.options-list button {
  position: relative;
  font-size: 1em;
  margin: 1em;
  padding: 1em;
  background-color: var(--fg-color);
  display: inline-block;
}
.jobs, .sensors, .outputs {
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
