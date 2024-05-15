
<template>
  <div class="jobs">
    <div class="job" v-for="job in settings.jobs" v-bind:key="job.output">
      <h2>{{ job.name }} (BCM_{{ job.output }})</h2>
      Name:
      <input type="text" v-model="job.name">
      <button v-on:click="updateJobName(job)">Save Name</button>
      <h4>condition:</h4>
      <template v-for="(condition, i) in job.conditions">
        <template v-if="condition.type === 'sensor'">
          <span v-bind:class="{ error: conditionErrors[job.output][i].error }" v-bind:key="i">s({{ sensorNames[condition.value] }})</span>
        </template>
        <template v-if="condition.type !== 'sensor'">
          <span v-bind:class="{ error: conditionErrors[job.output][i].error }" v-bind:key="i">{{ condition.value }}</span>
        </template>
      </template>
      <h4>condition editor:</h4>
      <div class="conditions">
        <template v-for="(condition, i) in job.conditions">
          <ConditionItem
            :condition="condition"
            :output="job.output"
            :index="i"
            :sensors="settings.sensors"
            :selected="currentlyEditingCondition"
            v-on:delete-condition="deleteCondition"
            v-on:update-condition="updateCondition"
            v-on:select-condition="setCurentlyEditing({ output:job.output, index:i })"
            v-bind:key="i"
          />
        </template>
        <button class="add-button" v-on:click="addCondition(job.output)">+</button>

        <button v-if="!conditionErrors[job.output].error" v-on:click="saveCondition(job.output)">Save Condition</button>
        <button v-if="conditionErrors[job.output].error" disabled="true"><strike>Save Condition</strike></button>
      </div>
      <div v-if="conditionErrors[job.output].error" class="error-message">
        <h2>Error</h2>
        <template v-for="(condition, i) in job.conditions">
          <div v-if="conditionErrors[job.output][i].error" v-bind:key="i">
            <p><b>{{ conditionErrors[job.output][i].error }}: </b>{{ conditionErrors[job.output][i].msg }}</p>
          </div>
        </template>
      </div>
    </div>
    <template v-if="loading">
      <Loading/>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

import ConditionItem from '@/components/ConditionItem.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Jobs',
  data () {
    return {
      loading: false,
      currentlyEditingCondition: { output: undefined, index: undefined },
      conditionError: {}
    }
  },
  components: {
    ConditionItem,
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
    },
    conditionErrors () {
      const validTypes = ['operation', 'sensor', 'constant']
      const errors = {}
      this.settings.jobs.forEach((job) => {
        errors[job.output] = {}
        let lastType = ''
        for (let index = 0; index < job.conditions.length; ++index) {
          errors[job.output][index] = {}
          const item = job.conditions[index]
          // Check if the type is valid.
          if (!validTypes.includes(item.type)) {
            errors[job.output][index] = { error: 'Unkown condition type', msg: `(${item.type}) is not a valid type.` }
          }
          if (item.type === 'operation') {
            const validOperations = ['+', '-', '>', '<', '==', '&&', '||', '*']
            if (!validOperations.includes(item.value)) {
              errors[job.output][index] = { error: 'Unkown operation', msg: `(${item.value}) is not a valid operation.` }
            }
            if (lastType === 'operation') {
              errors[job.output][index] = { error: 'Double operation', msg: 'Two or more operations are not allowed in a row.' }
            }
            if (index === 0) {
              errors[job.output][index] = { error: 'Starts with operation', msg: 'Not allowed to start a contition with an operation' }
            }
            if (index + 1 === job.conditions.length) {
              errors[job.output][index] = { error: 'Ends with operation', msg: 'Not allowed to end a contition with an operation' }
            }
          }
          if (item.type === 'sensor') {
            // Check if the given sensor does not exist in settings.
            if (!this.settings.sensors.some(sensor => sensor.sensor === item.value)) {
              errors[job.output][index] = { error: 'Sensor does not exist', msg: `The sensor (${item.value}) does not exist.` }
            }
            if (lastType === 'sensor') {
              errors[job.output][index] = { error: 'Double sensor', msg: 'Two or more sensors are not allowed in a row. (add an operation in between)' }
            }
            if (lastType === 'constant') {
              errors[job.output][index] = { error: 'Sensor next to constant', msg: 'A sensor and a constant cant be next to each other. (add an operation in between)' }
            }
          }
          if (item.type === 'constant') {
            // Check if the given constant is a number.
            if (isNaN(Number(item.value))) {
              errors[job.output][index] = { error: 'Constant is not a number', msg: `The constant (${item.value}) is not a number.` }
            }
            if (lastType === 'constant') {
              errors[job.output][index] = { error: 'Double constant', msg: 'Two or more constants are not allowed in a row. (add an operation in between)' }
            }
            if (lastType === 'sensor') {
              errors[job.output][index] = { error: 'Sensor next to constant', msg: 'A sensor and a constant cant be next to each other. (add an operation in between)' }
            }
          }
          lastType = item.type
          if (errors[job.output][index].error) {
            errors[job.output].error = 'Error'
          }
        }
      })
      return errors
    }
  },
  methods: {
    setCurentlyEditing (editingCondition) {
      this.currentlyEditingCondition = editingCondition
    },
    deleteCondition (condition) {
      const job = this.settings.jobs.find(j => j.output === condition.output)
      job.conditions.splice(condition.index, 1)
      this.currentlyEditingCondition = {}
    },
    updateCondition (condition) {
      const job = this.settings.jobs.find(j => j.output === condition.output)
      this.$set(job.conditions, condition.index, condition.condition)
    },
    addCondition (output) {
      const job = this.settings.jobs.find(j => j.output === output)
      job.conditions.push({ type: 'constant', value: 0 })
      this.currentlyEditingCondition = {}
      this.currentlyEditingCondition.output = output
      this.currentlyEditingCondition.index = job.conditions.length - 1
    },
    async saveCondition (output) {
      if (this.conditionErrors[output].error) {
        return
      }
      this.loading = true
      const job = this.settings.jobs.find(j => j.output === output)
      const { data } = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/settings/condition`, { output: output, condition: [...job.conditions] })
      this.loading = false
      if (data.error) {
        alert(`${data.error}\n\n${data.msg}`)
      } else if (Array.isArray(data)) {
        job.conditions = data
        this.currentlyEditingCondition = {}
      }
    },
    async updateJobName (job) {
      this.loading = true
      const { data } = await axios.put(`${process.env.VUE_APP_BACKEND_URL}/settings/job`, job)
      this.loading = false
      if (data.error) {
        console.log(data)
      } else {
        job = data
      }
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: #be4424;
}
span {
  padding: 0.25em;
}
button {
  background-color: var(--fg-color);
  color: var(--font-color);
  font-family: 'Fonten';
  outline: none;
  border-width: 0.1em;
}
.conditions>.add-button {
  width: 2em;
  margin: 0.5em;
  padding: 0.25em;
  font-size: 1.5em;
  color: #64be64;
}
.conditions>button {
  margin: 1em;
  padding: 0.5em;
  font-size: 1em;
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
.conditions {
  padding: 1em;
  background-color: var(--bg-color);
}
input {
  background-color: var(--fg-color);
  color: var(--font-color);
  font-family: 'Fonten';
  outline: none;
  border-width: 0.1em;
}
</style>
