import * as express from 'express';
import { Request, Response } from 'express';

import * as fs from 'fs'

import ConsoleService from '../services/console.service'

class TemperatureController {
  public path = '/temp';
  public router = express.Router();
  public temperatures = [];
  private settings;
  private sensors;
  private log;

  constructor(settings, sensors, log) {
    this.settings = settings;
    this.sensors = sensors;
    this.log = log;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.temperature);
    this.router.get(`${this.path}/current`, this.currentTemperature);
    this.router.get(`${this.path}/history`, this.history);
    this.router.delete(`${this.path}/history`, this.clearHistory);
    this.router.delete(`${this.path}`, this.clearLog);
  }

  private temperature = (req: Request, res: Response) => {
    res.send(this.log.log);
  }

  private currentTemperature = (req: Request, res: Response) => {
    res.send(this.readTemperatureSensors());
  }

  private history = (req: Request, res: Response) => {
    res.send(this.log.loadlogFile());
  }

  private clearHistory = (req: Request, res: Response) => {
    res.send(this.log.clearLogFile());
  }

  private clearLog = (req: Request, res: Response) => {
    res.send(this.log.clearLog());
  }

  private readTemperatureSensors() {
    return this.sensors.readSensors();
  }
}

export default TemperatureController
