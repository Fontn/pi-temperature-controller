import * as socketio from 'socket.io';

import * as http from 'http'
import { Server } from 'http'

class SocketController {

  constructor(server: Server) {
    this.io = socketio(server);
  }

  public initRoutes() {
    this.router.get(this.path, this.temperature);
  }

  private temperature = (req: Request, res: Response) => {
    res.send({ sensor1: 21.40, sensor2: 18.24 });
  }
}

export default TemperatureController
