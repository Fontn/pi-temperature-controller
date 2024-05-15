import * as fs from 'fs'

import ConsoleService from './console.service'

class SettingsService {
  public settings = {
    sensors: [],
    outputs: [],
    jobs: []
  };

  constructor() {
    this.loadSettings();
  }

  public storeSettings() {
    let data = JSON.stringify(this.settings, null, 2);
    fs.writeFileSync('settings.json', data)
  }

  private loadSettings() {
    let data = fs.readFileSync('settings.json', 'utf8');
    if (!data) {
      this.createSettings();
      return;
    }
    this.settings = JSON.parse(data);
    ConsoleService.log('Settings Loaded:');
    ConsoleService.log(JSON.stringify(this.settings));
  }

  private createSettings() {
  }
}

export default SettingsService
