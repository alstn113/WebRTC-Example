import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { parseCookie } from '~/utils';
import { AuthService } from '../auth/auth.service';
import { RoomsGateway } from './rooms.gateway';

@Injectable()
export class RoomsGatewayService {
  constructor(private readonly authService: AuthService) {}

  private server: Server;
  private logger = new Logger('RoomsGateway');

  onGatewayInit(server: Server) {
    this.server = server;
    this.logger.verbose('Initialized RoomGateway');
  }

  onGatewayConnection(client: Socket) {
    const accessToken = parseCookie(client.handshake.headers.cookie, 'access_token');
    if (accessToken) this.logger.verbose(`accessToken: ${accessToken}`);

    return;
  }

  onGatewayDisconnect(client: Socket) {
    return;
  }
}
