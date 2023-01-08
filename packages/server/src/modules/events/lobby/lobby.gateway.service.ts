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

      client.data.id = user.id;
      client.data.email = user.email;
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
    client.emit(EVENT.CHAT_MESSAGE, { message: `Joined lobby ${client.data.email}!` });
  }

  onLeaveLobby(client: Socket) {
    client.emit(EVENT.CHAT_MESSAGE, { message: `Left lobby ${client.data.email}` });
  }

  onSendMessage(client: Socket, dto: LobbyMessageDto) {
    // send to all clients in lobby
    this.server.emit(EVENT.CHAT_MESSAGE, {
      message: `${client.data.email}: ${dto.message}`,
    });
  }
}
