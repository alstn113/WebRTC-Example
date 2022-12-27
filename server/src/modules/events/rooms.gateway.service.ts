import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { parseCookie } from '~/utils';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { JoinRoomDto, LeaveRoomDto, SendMessageDto } from './dto';
import { RoomsGateway } from './rooms.gateway';

@Injectable()
export class RoomsGatewayService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
  ) {}

  private server: Server;
  private logger = new Logger('RoomsGateway');

  onGatewayInit(server: Server) {
    this.server = server;
    this.logger.verbose('Initialized RoomGateway');
  }

  async onGatewayConnection(client: Socket) {
    try {
      const accessToken = parseCookie(client.handshake.headers.cookie, 'access_token');
      const accessTokenPayload = await this.authService.verifyToken(accessToken, 'access_token');
      const user = await this.userRepository.findUserById(accessTokenPayload.userId);

      client.data.user = {
        id: user.id,
        email: user.email,
      };

      client.join(user.id);
      this.logger.verbose(`Connected user client_id: ${user.id}, server_id: ${client.id}`);
    } catch (error) {
      this.logger.error(error.message);
      client.disconnect(true);
      return;
    }
  }

  onGatewayDisconnect(client: Socket) {
    return;
  }

  onJoinRoom(client: Socket, dto: JoinRoomDto) {
    client.join(dto.roomId);
  }

  onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    client.leave(dto.roomId);
  }

  onSendMessage(client: Socket, dto: SendMessageDto) {
    client.emit('message', dto.message);
  }
}
