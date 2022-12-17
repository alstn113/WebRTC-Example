import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { AddMessageDto } from './dto/add-message.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';

@WebSocketGateway({
  namespace: '/socket/chats',
  transpost: ['websocket', 'polling'],
  cors: { origin: '*' },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('ChatsGateway');

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  /** OnGatewayInit */
  afterInit() {
    this.logger.verbose('Initialized');
  }

  /** OnGatewayConnection */
  handleConnection(client: Socket) {
    this.logger.verbose(`Client Connected : ${client.id}`);
  }

  /** OnGatewayDisconnect */
  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client Disconnected : ${client.id}`);
  }

  @SubscribeMessage('message')
  onMessage(client: Socket, addMessageDto: AddMessageDto) {
    client.to(addMessageDto.roomId).emit('message', addMessageDto.text);
  }

  @SubscribeMessage('join')
  onRoomJoin(client: Socket, joinRoomDto: JoinRoomDto) {
    client.join(joinRoomDto.roomId);
    client.to(joinRoomDto.roomId).emit('join', client.id);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client: Socket, leaveRoomDto: LeaveRoomDto) {
    client.leave(leaveRoomDto.roomId);
    client.to(leaveRoomDto.roomId).emit('leave', client.id);
  }
}
