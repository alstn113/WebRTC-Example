import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsGatewayService } from './rooms.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/rooms',
})
export class RoomsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomsGatewayService: RoomsGatewayService) {}

  afterInit(server: Server) {
    return this.roomsGatewayService.onGatewayInit(server);
  }

  handleConnection(client: Socket) {
    return this.roomsGatewayService.onGatewayConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.roomsGatewayService.onGatewayDisconnect(client);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, room: string) {
    client.leave(room);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    client.emit('message', message);
  }
}
