import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Application } from 'express'

import * as http from 'http'
import { Server } from 'http'

import ConsoleService from './services/console.service'

class App {
  public server: Server;
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; controllers: any; }) {
    this.app = express();
    this.port = appInit.port;

    this.server = http.createServer(this.app);

    this.app.use(bodyParser.json());
    this.routes(appInit.controllers);
    this.assets();
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private assets() {
    this.app.use(express.static('public'));
    this.app.use(express.static('views'));
  }

  public listen() {
    this.server.listen(this.port, () => {
      ConsoleService.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default App
