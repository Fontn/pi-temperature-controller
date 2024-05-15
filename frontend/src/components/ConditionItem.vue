<template>
  <div class="condition">
    <template v-if="!((selected.index === index) && (selected.output === output))">
      <template v-if="condition.type === 'sensor'">
        <span v-on:click="$emit('select-condition', { index: index, output: output })">s({{ sensorName }})</span>
      </template>
      <template v-if="condition.type !== 'sensor'">
        <span v-on:click="$emit('select-condition', { index: index, output: output })">{{ condition.value }}</span>
      </template>
    </template>
    <template v-if="(selected.index === index) && (selected.output === output)">
      <div class="condition-editor">
        <button v-on:click="$emit('delete-condition', {output: output, index: index, condition: condition})">Delete</button>
        <select v-model="conditionType" class="condition-type-select">
          <option :value="t" v-for="(t, index) in listOfConditionTypes" v-bind:key="index">
            {{ t }}
          </option>
        </select>
        <template v-if="condition.type === 'constant'">
          <div class="constant">
            <input type="number" class="constant-input" v-model="conditionValue"/>
          </div>
        </template>
        <template v-if="condition.type === 'sensor'">
          <div class="sensor">
            <select v-model="conditionValue" class="operation-select">
              <option :value="sensor.sensor" v-for="(sensor, index) in sensors" v-bind:key="index">
                {{ sensor.name }} ({{ sensor.sensor }})
              </option>
            </select>
          </div>
        </template>
        <template v-if="condition.type === 'operation'">
          <div class="operation">
            <select v-model="conditionValue" class="operation-select">
              <option :value="operation" v-for="(operation, index) in listOfOperations" v-bind:key="index">
                {{ operation }}
              </option>
            </select>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ConditionItem',
  data () {
    return {
      listOfConditionTypes: [
        'constant',
        'sensor',
        'operation'
      ],
      listOfOperations: ['+', '-', '*', '>', '<', '==', '&&', '||'],
      value: this.condition.value,
      type: this.condition.type
    }
  },
  computed: {
    sensorName () {
      if (this.condition.type === 'sensor') {
        const sensor = this.sensors.find(sensor => sensor.sensor === this.condition.value)
        return sensor ? sensor.name : this.condition.value
      }
      return ''
    },
    conditionType: {
      get () {
        return this.condition.type
      },
      set (newType) {
        let value
        if (newType === 'constant') {
          value = 0
        } else if (newType === 'sensor') {
          value = this.sensors[0].sensor
        } else if (newType === 'operation') {
          value = this.listOfOperations[0]
        }
        this.$emit('update-condition', { output: this.output, index: this.index, condition: { type: newType, value: value } })
      }
    },
    conditionValue: {
      get () {
        return this.condition.value
      },
      set (value) {
        let newValue = value
        if (this.condition.type === 'constant') {
          newValue = Number(newValue)
        }
        this.$emit('update-condition', { output: this.output, index: this.index, condition: { type: this.condition.type, value: newValue } })
      }
    }
  },
  methods: {
    updateValue () {
      this.$emit('update-condition', { output: this.output, index: this.index, condition: { type: this.type, value: this.value } })
    }
  },
  props: {
    output: Number,
    index: Number,
    condition: Object,
    sensors: Array,
    selected: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this condition only -->
<style scoped>
select {
  font-family: 'Fonten';
  padding: 0.2em;
  outline: none;
  border-width: 0.1em;
  background-color: var(--fg-color);
  color: var(--font-color);
}
button {
  font-family: 'Fonten';
  position: absolute;
  top: 0;
  right: 0;
  width: 4em;
  margin-left: 2em;
  padding: 0.2em;
  outline: none;
  border-width: 0.1em;
  background-color: var(--fg-color);
  color: #be4424;
}
.constant-input {
  font-family: 'Fonten';
  width: 6em;
  padding: 0.2em;
  outline: none;
  border-width: 0.1em;
  background-color: var(--fg-color);
  color: var(--font-color);
}
.condition {
  position: relative;
  margin: 0.1em;
  padding: 0.25em;
  min-width: 2em;
  background-color: var(--fg-color);
  display: inline-block;
}
.condition-editor {
  position: relative;
  margin: 0.1em;
  padding: 0.5em;
  padding-right: 4em;
  background-color: var(--fg-color);
  display: inline-block;
}
</style>
