import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ClientToServer')
  async handleMessage(@MessageBody('data') data: string) {
    this.server.emit('ServerToClient', data);
  }
}
