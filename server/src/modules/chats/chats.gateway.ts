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
import { Namespace, Server, Socket } from 'socket.io';
import { AddMessageDto } from './dto/add-message.dto';

@WebSocketGateway({
  namespace: 'chats',
  cors: { origin: ['http://localhost:3000'] },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly nsp: Namespace;
  private readonly connectedUsers: Map<string, string> = new Map();
  private readonly logger = new Logger('ChatsGateway');

  handleConnection(client: Socket) {
    this.logger.verbose(`Client Connected : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client Disconnected : ${client.id}`);
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, addMessageDto: AddMessageDto) {
    this.logger.verbose(`Message Received : ${addMessageDto.text}`);
  }

  @SubscribeMessage('join')
  async onJoin(client: Socket, room: string) {
    client.join(room);
    this.logger.verbose(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('leave')
  async onLeave(client: Socket, room: string) {
    client.leave(room);
    this.logger.verbose(`Client ${client.id} left room ${room}`);
  }

  // @SubscribeMessage('ClientToServer')
  // async handleMessage(@MessageBody('data') data: string) {
  //   console.log(data);
  //   this.nsp.adapter.emit('ServerToClient', data + ' from server');
  // }
}
