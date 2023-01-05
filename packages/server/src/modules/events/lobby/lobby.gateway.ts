import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyGatewayService } from './lobby.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/lobby',
})
export class LobbyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly lobbyGatewayService: LobbyGatewayService) {}

  /** Default Setting */

  afterInit(server: Server) {
    return this.lobbyGatewayService.onGatewayInit(server);
  }

  async handleConnection(client: Socket) {
    return await this.lobbyGatewayService.onGatewayConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.lobbyGatewayService.onGatewayDisconnect(client);
  }
}
