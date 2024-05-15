import * as express from 'express';
import { Request, Response } from 'express';

import * as fs from 'fs'

import ConsoleService from '../services/console.service'

class OutputController {
  public path = '/output';
  public router = express.Router();
  private settings;
  private outputs;

  constructor(settings, outputs) {
    this.settings = settings;
    this.outputs = outputs;
    this.initRoutes();
    this.loadOutputsFromSettings();
  }

  public initRoutes() {
    this.router.get(this.path, this.outputPage);
    this.router.delete(`${this.path}`, this.removeOutput);
    this.router.post(`${this.path}`, this.createOutput);
    this.router.put(`${this.path}`, this.setOutputName);
    this.router.put(`${this.path}/set-timer`, this.setTimer);
  }

  private outputPage = (req: Request, res: Response) => {
    res.send(this.outputs.outputs);
  }

  private setTimer = (req: Request, res: Response) => {
    if (req.body.bcm && req.body.timer) {
      let bcm = req.body.bcm;
      let timer = req.body.timer;
      ConsoleService.log(req.body);
      let output = this.outputs.outputs.find(output => output.bcm == bcm);
      if (output) {
        output.timer = timer;
        res.send(output);
      } else {
        res.send({error: 'Output not found', msg: `The output bcm does not exist. Create one first using /${this.path}/create`});
      }
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"bcm":int, "timer":new Date()'});
    }
  }

  private createOutput = (req: Request, res: Response) => {
    if (req.body.bcm) {
      const output = this.outputs.createOutput(req.body.bcm);
      if (output.error) {
        ConsoleService.log(output)
        return res.send(output);
      } else {
        const setGpioMode = this.outputs.setGpioMode(output.bcm, 'out');
        if (setGpioMode.error) {
          ConsoleService.log(setGpioMode);
          return res.send(setGpioMode);
        }
        const newName = req.body.name ? req.body.name : `BCM_${output.bcm}`;
        const settingsOutput = {bcm: output.bcm, name: newName};
        const newJob = {name: `Job for ${newName}`, output: output.bcm, conditions: []};
        this.settings.settings.jobs.push(newJob);
        this.settings.settings.outputs.push(settingsOutput)
        res.send({output: settingsOutput, job: newJob});
      }
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"bcm":int}'});
    }
  }

  private setOutputName = (req: Request, res: Response) => {
    if (req.body.bcm && req.body.name) {
      let bcm = req.body.bcm;
      let name = req.body.name;
      const output = this.settings.settings.outputs.find(output => output.bcm === bcm);
      if (output) {
        output.name = name;
        this.settings.storeSettings();
        res.send(output);
      } else {
        res.send({error: 'Output not found', msg: 'The output bcm does not exist.'});
      }
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"bcm":int, "name":String}'});
    }
  }

  private removeOutput = (req: Request, res: Response) => {
    if (req.body.bcm) {
      let bcm = req.body.bcm;
      const oldOutput = this.settings.settings.outputs.find(output => output.bcm === bcm);
      if (oldOutput) {
        const removedOutput = this.outputs.removeOutput(oldOutput.bcm);
        if (removedOutput.error) {
          return res.send(removedOutput);
        }
        this.settings.settings.outputs = this.settings.settings.outputs.filter(output => output.bcm !== bcm);
        this.settings.settings.jobs = this.settings.settings.jobs.filter(job => job.output !== bcm);
        this.settings.storeSettings();
        res.send(this.settings.settings.outputs);
      } else {
        res.send({error: 'Output not found', msg: 'The output bcm does not exist.'});
      }
    } else {
      res.send({error: 'Missing value', msg:'Expected JSON with following structure: {"bcm":int}'});
    }
  }

  private loadOutputsFromSettings() {
    let outputs = this.settings.settings.outputs;
    for (let index = 0; index < outputs.length; ++index) {
      if (this.outputs.outputs.some(output => output.bcm == outputs[index].bcm)) {
        continue;
      } else {
        const output = this.outputs.createOutput(outputs[index].bcm);
        if (output.error) {
          ConsoleService.log(output)
          continue;
        }
        const createGpio = this.outputs.createGpioOutput(outputs[index].bcm);
        if (createGpio.error) {
          ConsoleService.log(createGpio)
          continue;
        }
        const setGpioStatus = this.outputs.setGpioMode(outputs[index].bcm, 'out');
        if (setGpioStatus.error) {
          ConsoleService.log(setGpioStatus)
          continue;
        }
      }
    }
  }
}

export default OutputController
