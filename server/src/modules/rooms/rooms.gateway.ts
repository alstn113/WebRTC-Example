import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway({
  namespace: 'chats',
  cors: { origin: ['http://localhost:3000'] },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedUsers: Map<string, number> = new Map();
  private logger = new Logger('RoomsGateway');

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  /** OnGatewayInit */
  afterInit(server: Server) {
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
}
