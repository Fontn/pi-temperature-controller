import { execSync } from 'child_process';
import * as schedule from 'node-schedule';

import ConsoleService from './console.service'

class JobService {
  private settings;
  private sensors;
  private log;
  private outputs;
  private updateFrequency = 1;

  constructor(settings, sensors, log, outputs) {
    this.settings = settings;
    this.sensors = sensors;
    this.log = log;
    this.outputs = outputs;

    if (this.settings.settings.updateFrequency) {
      this.updateFrequency = this.settings.settings.updateFrequency;
    }

    this.startJobLoop(this.updateFrequency);
  }

  private startJobLoop(updateFrequency) {
    let j = schedule.scheduleJob(`*/${updateFrequency}`, this.jobLoop.bind(this));
    ConsoleService.log(`Job service started, all existing jobs will be runned every ${updateFrequency} minutes.`);
  }


  private jobLoop() {
    let sensors = this.sensors.readSensors();
    let jobs = this.settings.settings.jobs;
    for (let index = 0; index < jobs.length; ++index) {
      if (!jobs[index].conditions) {
        continue;
      }
      let parsedJob = this.parseJob(sensors.sensors, jobs[index]);
      if (parsedJob.error) {
        ConsoleService.log(parsedJob);
        continue;
      }

      // get output
      let output = this.outputs.outputs.find(output => output.bcm == jobs[index].output);
      if (!output) {
        continue;
      }
      if (output.on === parsedJob.condition) {
        continue;
      }

      let setGpioStatus;
      if (parsedJob.condition === true) {
        setGpioStatus = this.outputs.setGpioOutputOn(output.bcm);
      } else {
        setGpioStatus = this.outputs.setGpioOutputOff(output.bcm);
      }
      if (setGpioStatus.error) {
        ConsoleService.log(setGpioStatus);
        continue;
      }
    }
    let outputs = this.outputs.outputs.map(output => ({...output}));
    this.log.pushToLog({date: sensors.date, sensors: sensors.sensors, outputs:outputs});
  }

  private parseJob(sensors, job) {
    let parsedCondition = job.conditions.reduce((result, value, index, array) => {
      if (value.type === 'constant') {
        if (value.value < 0) {
          return result + `(${value.value.toString()})`;
        } else {
          return result + value.value.toString();
        }
      } else if (value.type === 'sensor') {
        let specifiedSensor = sensors.find(sensor => sensor.sensor === value.value);
        if (specifiedSensor) {
          if (value.value < 0) {
            return result + `(${specifiedSensor.temperature.toString()})`;
          } else {
            return result + specifiedSensor.temperature.toString();
          }
        } else {
          return '0';
        }
      } else if (value.type === 'operation') {
        return result + value.value;
      }
    }, '');
    try {
      const condition = eval(parsedCondition)
      return {output: job.output, name: job.name, condition: condition}
    } catch(err) {
      return {error: err.name, msg: err.message}
    }
  }
}

export default JobService
