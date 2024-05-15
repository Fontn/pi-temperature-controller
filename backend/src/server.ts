process.chdir(__dirname);
import { Server } from 'http'

import App from './app';

import TemperatureController from './controllers/temperature.controller';
import SettingsController from './controllers/settings.controller';
import OutputController from './controllers/output.controller';

import SettingsService from './services/settings.service';
import SensorsService from './services/sensors.service';
import LogService from './services/log.service';
import JobService from './services/job.service';
import OutputService from './services/output.service';
import ConsoleService from './services/console.service';

// Server starting
ConsoleService.log('Starting the server');

const settingsService = new SettingsService();
const sensorsService = new SensorsService();
const logService = new LogService();
const outputService = new OutputService();

const app = new App({
  port: 3000,
  controllers: [
    new TemperatureController(settingsService, sensorsService, logService),
    new SettingsController(settingsService, sensorsService),
    new OutputController(settingsService, outputService)
  ]
});

// Starting the job service
const jobService = new JobService(settingsService, sensorsService, logService, outputService);

// Begin listening for requests
app.listen();

// Adding safe shutdown for the gpios

const shutdown = function () {
  ConsoleService.log('Server is shutting down');
  outputService.safeShutdown();
  app.server.close(() => {
    ConsoleService.log('Server shutdown');
    process.exit(0);
  });
}
process.on('SIGINT', shutdown);
