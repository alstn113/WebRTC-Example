import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AuthService } from '~/modules/auth/auth.service';
import { UsersRepository } from '~/modules/users/users.repository';
import { parseCookie } from '~/utils';

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
}
