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
  namespace: 'chats',
  cors: { origin: ['http://localhost:3000'] },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedUsers: Map<string, number> = new Map();
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
  async handleConnection(client: Socket) {
    const token = client.handshake.query.token.toString();
    const payload = await this.authService.verifyAccessToken(token);

    const user = payload && (await this.userService.findUserById(payload.id));
    if (!user) {
      client.disconnect();
      return;
    }

    this.connectedUsers.set(client.id, user.id);

    this.logger.verbose(`Client Connected : ${client.id}`);
  }

  /** OnGatewayDisconnect */
  handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
    this.logger.verbose(`Client Disconnected : ${client.id}`);
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, addMessageDto: AddMessageDto) {
    client.to(addMessageDto.roomId).emit('message', addMessageDto.text);
    this.logger.verbose(`Message Received : ${addMessageDto.text}`);
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, joinRoomDto: JoinRoomDto) {
    client.join(joinRoomDto.roomId);
    this.logger.verbose(`Client ${client.id} joined room ${joinRoomDto.roomId}`);
  }

  @SubscribeMessage('leave')
  async onRoomLeave(client: Socket, leaveRoomDto: LeaveRoomDto) {
    client.leave(leaveRoomDto.roomId);
    this.logger.verbose(`Client ${client.id} left room ${leaveRoomDto.roomId}`);
  }
}
