import * as express from 'express';
import { Request, Response } from 'express';

import * as fs from 'fs'

import ConsoleService from '../services/console.service'

class SettingsController {
  public path = '/settings';
  public router = express.Router();
  private settings;
  private sensors;

  constructor(settings, sensors) {
    this.settings = settings
    this.sensors = sensors
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.settingsPage);
    this.router.post(`${this.path}/reset-sensors`, this.resetSensors);
    this.router.post(`${this.path}/condition`, this.createCondition);
    this.router.put(`${this.path}/condition`, this.updateCondition);
    this.router.put(`${this.path}/sensor`, this.setSensorName);
    this.router.put(`${this.path}/job`, this.setJobName);
    this.router.put(`${this.path}/update-frequency`, this.updateFrequency);
  }

  private resetSensors = (req: Request, res: Response) => {
    this.settings.settings.sensors = [];
    const { sensors } = this.sensors.readSensors();
    sensors.forEach((sensor) => {
      this.settings.settings.sensors.push({sensor: sensor.sensor, name: `(${sensor.sensor}) ${sensor.temperature}°C`});
    });
    this.settings.storeSettings();
    res.send(this.settings.settings.sensors);
  }

  private setSensorName = (req: Request, res: Response) => {
    if (req.body.sensor && req.body.name) {
      let newSensor = req.body.sensor;
      let name = req.body.name;
      const sensor = this.settings.settings.sensors.find(sensor => sensor.sensor === newSensor);
      if (sensor) {
        sensor.name = name;
        this.settings.storeSettings();
        res.send(sensor);
      } else {
        res.send({error: 'Sensor not found', msg: 'The sensor id does not exist.'});
      }
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"id":String, "name":String}'});
    }
  }

  private setJobName = (req: Request, res: Response) => {
    if (req.body.name && req.body.output) {
      let name = req.body.name;
      let output = req.body.output;
      const job = this.settings.settings.jobs.find(job => job.output === output);
      if (job) {
        job.name = name;
        this.settings.storeSettings();
        res.send(job);
      } else {
        res.send({error: 'Job not found', msg: 'The job does not exist.'});
      }
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"name":String, "output":int}'});
    }
  }

  private validateCondition(condition) {
    // Check if it is not an array.
    if (!Array.isArray(condition)) {
      return {error: 'Incorrect condition format', msg: 'The condition is not structured as an array.'};
    }
    const validTypes = ['operation', 'sensor', 'constant'];
    for (let index = 0; index < condition.length; ++index) {
      let item = condition[index]
      // Check if the type is valid.
      if (!validTypes.includes(item.type)) {
        return {error: 'Unkown condition type', msg: `(${item.type}) is not a valid type.`};
      }
      if (item.type === 'operation') {
        const validOperations = ['+', '-', '>', '<', '==', '&&', '||', '*'];
        if (!validOperations.includes(item.value)) {
          return {error: 'Unkown operation', msg: `(${item.value}) is not a valid operation.`};
        }
      }
      if (item.type === 'sensor') {
        // Check if the given sensor does not exist in settings.
        if (!this.settings.settings.sensors.some(sensor => sensor.sensor === item.value)) {
          return {error: 'Sensor does not exist', msg: `The sensor (${item.value}) does not exist.`};
        }
      }
      if (item.type === 'constant') {
        // Check if the given constant is a number.
        if (isNaN(item.value)) {
          return {error: 'Constant is not a number', msg: `The constant (${item.value}) is not a number.`};
        }
      }
    }
    return condition;
  }

  private createCondition = (req: Request, res: Response) => {
    if (req.body.condition && req.body.output) {
      let newCondition = req.body.condition;
      let output = req.body.output;
      let condition = this.validateCondition(newCondition);
      if (!Array.isArray(condition)) {
        return res.send(condition);
      }
      const job = this.settings.settings.jobs.find(job => job.output === output);
      if (job) {
        job.conditions = condition;
        this.settings.storeSettings();
        return res.send(job.conditions);
      } else {
        return res.send({error: 'Job not found', msg: 'The job does not exist.'});
      }
    } else {
      return res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"output":Int, "condition": [ {"type":String, "value":String/int/undefined} ...]}'});
    }
  }

  private updateCondition = (req: Request, res: Response) => {
    if (req.body.jobIndex && req.body.conditionIndex && req.body.condition) {
      let jobIndex = req.body.jobIndex;
      let conditionIndex = req.body.conditionIndex;
      let newCondition = req.body.condition;
      if (!this.settings.settings.jobs[jobIndex]) {
        return res.send({error: 'Job does not exist', msg: 'The specified job index is out of bounds.'});
      }
      if (!this.settings.settings.jobs[jobIndex].conditions[conditionIndex]) {
        return res.send({error: 'Condition does not exist', msg: 'The specified condition index is out of bounds.'});
      }
      ConsoleService.log(this.settings.settings.jobs[jobIndex].conditions[conditionIndex]);
      let condition = this.validateCondition(newCondition);
      ConsoleService.log(condition);
      this.settings.storeSettings();
      res.send(condition);
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"jobIndex":int, "conditionIndex":int, "condition": [ {"type":String, "value":String/int/undefined} ...]}'});
    }
  }

  private settingsPage = (req: Request, res: Response) => {
    res.send(this.settings.settings);
  }

  private updateFrequency = (req: Request, res: Response) => {
    if (req.body.updateFrequency) {
      const frequency = req.body.updateFrequency;
      if (!Number.isInteger(frequency)) {
        return res.send({error: 'Incorrect type', msg:'updateFrequency must be an Integer (1, 2, ..., 59 or 60)'});
      }
      if (frequency < 1 || frequency > 60) {
        return res.send({error: 'Value out of range', msg:'updateFrequency can be minimum 1 and maximum 60 minutes.'});
      }
      this.settings.settings.updateFrequency = frequency
      ConsoleService.log('Update frequency has been changed in settings, for this to take effect the server application must be restarted.');
      res.send({ updateFrequency: this.settings.settings.updateFrequency});
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"updateFrequency":int}'});
    }
  }
}

export default SettingsController
