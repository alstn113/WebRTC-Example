import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
import { AuthService } from '~/modules/auth/auth.service';
import { UsersRepository } from '~/modules/users/users.repository';
import { parseCookie } from '~/utils';
import { LobbyMessageDto } from '../dto';

@Injectable()
export class LobbyGatewayService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
  ) {}

  private server: Server;
  private logger = new Logger('LobbyGateway');

  onGatewayInit(server: Server) {
    this.server = server;
    this.logger.verbose('Initialized LobbyGateway');
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
    } catch (error) {
      this.logger.error(error.message);
      client.disconnect(true);
    }
  }

  onGatewayDisconnect(client: Socket) {
    return;
  }

  /** Lobby Chat */

  onJoinLobby(client: Socket) {
    client.emit(EVENT.CHAT_MESSAGE, `Joined room ${client.data.user.email}!`);
  }

  onLeaveLobby(client: Socket) {
    client.emit(EVENT.CHAT_MESSAGE, `Left room ${client.data.user.email}`);
  }

  onSendMessage(client: Socket, dto: LobbyMessageDto) {
    // send to all clients in room
    this.server.emit(EVENT.CHAT_MESSAGE, `${client.data.user.email}: ${dto.message}`);
  }
}
