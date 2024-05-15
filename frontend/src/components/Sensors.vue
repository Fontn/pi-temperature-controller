<template>
  <div class="sensors">
    <template v-for="(sensor, index) in sensors">
      <div class="sensor" v-bind:key="index">
        <h1>{{ sensor.name }}</h1>
        <h2>{{ sensor.temperature }}°C</h2>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Sensors',
  data () {
    return {}
  },
  props: {
    sensors: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sensor {
  margin: 0.5em;
  padding: 1em;
  min-width: 10em;
  background-color: var(--fg-color);
  display: inline-block;
}
</style>
