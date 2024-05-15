import { execSync } from 'child_process';

class SensorsService {
  public sensors = [];

  constructor() {
  }

  public readSensors() {
    let rawSensorData = execSync('bash read-temperatures.sh', {encoding:'utf8'});
    let rawSensorArray = rawSensorData.split('\n');
    let sensorsList = rawSensorArray.reduce((result, value, index, array) => {
      if (index % 2 === 0 && array[index + 1]) {
        let temp = parseFloat(`${array[index + 1].slice(2)}e-3`);
        result.push({sensor: array[index], temperature: temp});
      }
      return result;
    }, []);
    this.sensors = sensorsList;
    return {date: new Date(), sensors: sensorsList};
  }
}

export default SensorsService
