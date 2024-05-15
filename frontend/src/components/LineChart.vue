<script>
import Chart from 'chart.js'
import { Line } from 'vue-chartjs'

Chart.defaults.global.defaultFontFamily = 'Fonten'

export default {
  extends: Line,
  props: {
    data: {
      type: Array
    },
    options: {
      type: Object
    },
    colors: {
      type: Object
    },
    zoom: {
      type: Number
    },
    deviceNames: {
      type: Array
    }
  },
  data () {
    return {
      fullData: [],
      chartData: [],
      chartColors: [
        {
          primary: 'rgba(100, 110, 190, 1)',
          secondary: 'rgba(100, 110, 190, 0.1)'
        },
        {
          primary: 'rgba(190, 110, 100, 1)',
          secondary: 'rgba(190, 110, 100, 0.1)'
        },
        {
          primary: 'rgba(110, 190, 100, 1)',
          secondary: 'rgba(110, 190, 100, 0.1)'
        },
        {
          primary: 'rgba(200, 160, 40, 1)',
          secondary: 'rgba(200, 160, 40, 0.1)'
        },
        {
          primary: 'rgba(100, 190, 190, 1)',
          secondary: 'rgba(100, 190, 190, 0.1)'
        },
        {
          primary: 'rgba(190, 100, 190, 1)',
          secondary: 'rgba(190, 100, 190, 0.1)'
        },
        // Darker version of the colors above
        {
          primary: 'rgba(80, 90, 150, 1)',
          secondary: 'rgba(80, 90, 150, 0.1)'
        },
        {
          primary: 'rgba(150, 90, 80, 1)',
          secondary: 'rgba(150, 90, 80, 0.1)'
        },
        {
          primary: 'rgba(90, 150, 80, 1)',
          secondary: 'rgba(90, 150, 80, 0.1)'
        },
        {
          primary: 'rgba(160, 130, 30, 1)',
          secondary: 'rgba(160, 130, 30, 0.1)'
        },
        {
          primary: 'rgba(80, 150, 150, 1)',
          secondary: 'rgba(80, 150, 150, 0.1)'
        },
        {
          primary: 'rgba(150, 80, 150, 1)',
          secondary: 'rgba(150, 80, 150, 0.1)'
        }
      ]
    }
  },
  watch: {
    zoom: function (newZoom, oldZoom) {
      this.chartData = this.zoomChartData(newZoom)
      this.renderChart(this.chartData, this.options)
    }
  },
  methods: {
    applyChartColor: function () {
      for (let index = 0; index < this.fullData.datasets.length; ++index) {
        this.fullData.datasets[index].borderColor = this.chartColors[index].primary
        this.fullData.datasets[index].pointBorderColor = this.chartColors[index].primary
        this.fullData.datasets[index].pointBackgroundColor = this.chartColors[index].secondary
        this.fullData.datasets[index].backgroundColor = this.chartColors[index].secondary
      }
    },
    zoomChartData: function (zoom) {
      if (!zoom) {
        return this.fullData
      }
      const newChartData = { labels: [], datasets: [] }
      newChartData.labels = Array.from(this.fullData.labels)
      newChartData.labels = newChartData.labels.filter(function (value, index, Arr) {
        return (Arr.length - index - 1) % zoom === 0
      })
      const spliceAmount = Math.max(newChartData.labels.length - 30, 0)
      newChartData.labels.splice(0, spliceAmount)
      this.fullData.datasets.forEach((dataset) => {
        const newDataset = {}
        Object.keys(dataset).forEach((key) => {
          if (key !== 'data') {
            newDataset[key] = dataset[key]
          } else {
            newDataset[key] = Array.from(dataset.data)
            newDataset[key] = newDataset[key].filter(function (value, index, Arr) {
              return (Arr.length - index - 1) % zoom === 0
            })
            newDataset[key].splice(0, spliceAmount)
          }
        })
        newChartData.datasets.push(newDataset)
      })
      return newChartData
    },
    createChartData: function (rawData) {
      const dates = rawData.map(function (d) {
        return d.date
      })

      // Get each sensor/output
      const devices = rawData.reduce((result, value, index, array) => {
        const newResult = []
        value.sensors.forEach((item) => {
          const existing = result.find(s => s.name === item.sensor)
          if (!existing) {
            const { sensor, ...labels } = item
            const returnLabels = Object.keys(labels).map(function (key) {
              const dataArray = []
              dataArray[index] = labels[key]
              return { label: key, data: dataArray }
            })
            newResult.push({ name: sensor, labels: returnLabels })
          } else {
            existing.labels.forEach((label) => {
              label.data[index] = item[label.label]
            })
          }
        })
        if (!value.outputs) {
          return [...result, ...newResult]
        }
        value.outputs.forEach((item) => {
          const existing = result.find(o => o.name === item.bcm)
          if (!existing) {
            const { bcm, ...labels } = item
            const returnLabels = Object.keys(labels).map(function (key) {
              const dataArray = []
              dataArray[index] = labels[key]
              return { label: key, data: dataArray }
            })
            newResult.push({ name: item.bcm, labels: returnLabels })
          } else {
            existing.labels.forEach((label) => {
              label.data[index] = item[label.label]
            })
          }
        })
        return [...result, ...newResult]
      }, [])

      const namedDevices = this.applyNamesToDevices(devices)

      const datasets = []
      // create new array for each sensors attribute
      namedDevices.forEach((device) => {
        device.labels.forEach((label) => {
          const dataset = {
            label: `${device.name} - ${label.label}`,
            data: label.data.map(x => ((x === undefined) ? Number.NaN : x)),
            pointRadius: 0,
            pointHitRadius: 20,
            steppedLine: (typeof label.data[0] === 'boolean')
          }
          datasets.push(dataset)
        })
      })
      return { labels: dates, datasets: datasets }
    },
    applyNamesToDevices (devices) {
      if (!this.deviceNames) {
        return devices
      }
      devices.forEach((device) => {
        const name = this.deviceNames.find(name => name.id === device.name)
        if (name) {
          device.name = name.name
        }
      })
      return devices
    }
  },
  mounted () {
    this.fullData = this.createChartData(this.data)
    this.applyChartColor()
    this.chartData = this.zoomChartData(this.zoom)
    this.renderChart(this.chartData, this.options)
  }
}
</script>
