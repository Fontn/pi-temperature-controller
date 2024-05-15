import * as fs from 'fs'

import ConsoleService from './console.service'

class LogService {
  public log = [];
  public previousLogDate: String;
  public numberOfEntriesInMemmory = 2880; // 60 times an hour for 48 hours

  constructor() {
    //this.stream = fs.createWriteStream('log.txt', {flags:'a'});
  }

  public writeLogToFile() {
    // Reduces the memmory log file for the previous day into min and max values.
    let sensors = this.log.reduce((result, value, index, array) => {
      if (value.date.toDateString() === this.previousLogDate) {
        for (let index = 0; index < value.sensors.length; ++index) {
          if (result[index] === undefined) {
            result[index] = {sensor: value.sensors[index].sensor, min: undefined, max: undefined}
          }
          if (result[index].min === undefined || value.sensors[index].temperature < result[index].min) {
            result[index].min = value.sensors[index].temperature;
          }
          if (result[index].max === undefined || value.sensors[index].temperature > result[index].max) {
            result[index].max = value.sensors[index].temperature;
          }
        }
      }
      return result;
    }, []);

    // Creates a log file entry based on the min and max values
    let entry = {date: this.previousLogDate, sensors: sensors};

    ConsoleService.log('Writing data to log file.');
    try {
      fs.appendFileSync('log.txt', `${JSON.stringify(entry)}\n`);
      ConsoleService.log('Log was successfully written.');
    } catch (err) {
      ConsoleService.log(err);
      return {error: err.name, msg: err.message};
    }
  }

  public pushToLog(entry) {
    // If the time of previous write to log is unknow it is set to Now.
    if (!this.previousLogDate) {
      this.previousLogDate = entry.date.toDateString();
    }
    // Write to the log file the next update after midnight.
    if (entry.date.toDateString() !== this.previousLogDate) {
      let writeError = this.writeLogToFile();
      if (writeError) {
        ConsoleService.log(writeError);
      } else {
        this.previousLogDate = entry.date.toDateString();
      }
    }
    // Adds the entry to the memmory log. If it is full, remove the oldest entry.
    this.log.push(entry);
    if (this.log.length > this.numberOfEntriesInMemmory) {
      this.log.shift();
    }
  }

  public clearLog() {
    this.log = [];
  }

  public clearLogFile() {
    fs.writeFileSync('log.txt', '', 'utf8');
  }

  private loadlogFile() {
    let data = fs.readFileSync('log.txt', 'utf8');
    let logFile = data.split('\n');
    logFile.pop();
    let parsedLogFile = logFile.map(entry => JSON.parse(entry));
    return parsedLogFile;
  }
}

export default LogService
