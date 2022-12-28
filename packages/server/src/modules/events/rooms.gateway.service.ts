import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
import { parseCookie } from '~/utils';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { JoinRoomDto, LeaveRoomDto, SendMessageDto } from './dto';

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

      this.logger.verbose(`Connected user client_id: ${user.id}, server_id: ${client.id}`);
    } catch (error) {
      this.logger.error(error.message);
      client.disconnect(true);
    }
  }

  onGatewayDisconnect(client: Socket) {
    return;
  }

  onJoinRoom(client: Socket, dto: JoinRoomDto) {
    client.join(dto.roomId);
    client
      .to(dto.roomId)
      .emit(EVENT.RECEIVE_MESSAGE, `Joined room ${dto.roomId} server_id: ${client.id}!`);
  }

  onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    client.leave(dto.roomId);
    client
      .to(dto.roomId)
      .emit(EVENT.RECEIVE_MESSAGE, `Left room ${dto.roomId}! server_id: ${client.id}`);
  }

  onSendMessage(client: Socket, dto: SendMessageDto) {
    client.to(dto.roomId).emit(EVENT.RECEIVE_MESSAGE, `${dto.message} server_id: ${client.id}`);
  }
}
