import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger = new Logger('EventsGateway');

  afterInit() {
    this.logger.verbose('Init');
  }

  handleConnection(client: Socket) {
    this.logger.verbose(`Client Connected : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client Disconnected : ${client.id}`);
  }

  @SubscribeMessage('ClientToServer')
  async handleMessage(@MessageBody('data') data: string) {
    console.log(data);
    this.server.emit('ServerToClient', data + ' from server');
  }
}
