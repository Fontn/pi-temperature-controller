import { Gpio } from 'onoff';

import ConsoleService from './console.service'

class OutputService {
  public outputs = [];
  private gpios = {};

  constructor() {
  }

  public safeShutdown() {
    for (const bcm in this.gpios) {
      this.gpios[bcm].unexport();
    }
  }

  public createOutput(bcm) {
    let output = this.outputs.find(output => output.bcm === bcm);
    if (output) {
      return {error: 'Output already exists', msg: `An output already exists on BCM_${output.bcm}.`};
    }
    output = {bcm: bcm, on: false, timer:undefined};
    this.outputs.push(output);
    const gpioOutput = this.createGpioOutput(bcm);
    if (gpioOutput.error) {
      this.outputs = this.outputs.filter(output => output.bcm !== bcm);
      return gpioOutput;
    }
    return output;
  }

  public removeOutput(bcm) {
    try {
      let output = this.outputs.find(output => output.bcm === bcm);
      if (!output) {
        return {error: 'Output not found', msg: `No output exist on BCM_${output.bcm}.`};
      }
      this.outputs = this.outputs.filter(output => output.bcm !== bcm);
      if (this.gpios[bcm]) {
        ConsoleService.log(`Releasing Gpio on BCM_${bcm}`);
        this.gpios[bcm].unexport();
        this.gpios[bcm] = undefined;
      }
      return output;
    } catch(err) {
      return {error: err.name, msg: err.message};
    }
  }

  public setTimer(bcm) {
    try {
      ConsoleService.log(`Timers are not implemented`);
    } catch(err) {
      return {error: err.name, msg: err.message};
    }
  }

  public createGpioOutput(bcm) {
    try {
      let output = this.outputs.find(output => output.bcm === bcm);
      if (!output) {
        return {error: 'Output not found', msg: 'No output to create a Gpio output on'};
      }
      if (this.gpios[bcm]) {
        return {error: 'Gpio exists', msg:`Gpio already exists on BCM_${bcm}`};
      }
      ConsoleService.log(`Creating Gpio on BCM_${bcm}`);
      this.gpios[bcm] = new Gpio(bcm, 'out');
      return output;
    } catch(err) {
      return {error: err.name, msg: err.message};
    }
  }

  public setGpioMode(bcm, mode) {
    try {
      let output = this.outputs.find(output => output.bcm === bcm);
      if (!output) {
        return {error: 'Output not found', msg: 'No output to create a Gpio output on'};
      }
      const validBcm = [...Array(28).keys()];
      const validMode = ['in', 'out', 'high', 'low'];
      if (!validBcm.includes(bcm) || !validMode.includes(mode)) {
        return {error: 'Invalid value', msg: `${!validBcm.includes(bcm) ? 'BCM ': ''}${!validMode.includes(mode) ? 'Mode ': ''}is invalid`}
      }
      if (!this.gpios[bcm]) {
        return {error: 'Gpio not found', msg:`Gpio does not exist on BCM_${bcm}`}
      }
      ConsoleService.log(`Setting direction of Gpio on BCM_${bcm} to ${mode}`);
      this.gpios[bcm].setDirection(mode);
      return output;
    } catch(err) {
      return {error: err.name, msg: err.message};
    }
  }

  public setGpioOutputOn(bcm) {
    try {
      let output = this.outputs.find(output => output.bcm === bcm);
      if (!output) {
        return {error: 'Output not found', msg: 'No output to set gpio to'};
      }
      if (!this.gpios[bcm]) {
        return {error: 'Gpio not found', msg:`Gpio does not exist on BCM_${bcm}`}
      }
      ConsoleService.log(`Gpio BCM_${bcm} set to 1`);
      this.gpios[bcm].writeSync(1)
      output.on = true;
      return output;
    } catch(err) {
      return {error: err.name, msg: err.message};
    }
  }

  public setGpioOutputOff(bcm) {
    try {
      let output = this.outputs.find(output => output.bcm === bcm);
      if (!output) {
        return {error: 'Output not found', msg: 'No output to set gpio to'};
      }
      if (!this.gpios[bcm]) {
        return {error: 'Gpio not found', msg:`Gpio does not exist on BCM_${bcm}`}
      }
      ConsoleService.log(`Gpio BCM_${bcm} set to 0`);
      this.gpios[bcm].writeSync(0)
      output.on = false;
      return output;
    } catch(err) {
      return {error: err.name, msg: err.message};
    }
  }
}

export default OutputService
