import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
import { LobbyMessageDto } from '../dto/lobby-message.dto';
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

  sendMessage(client: Socket, message: string) {
    client.emit('message', message);
  }

  /** Lobby Chat */

  @SubscribeMessage(EVENT.JOIN_LOBBY)
  handleJoinLobby(client: Socket) {
    return this.lobbyGatewayService.onJoinLobby(client);
  }

  @SubscribeMessage(EVENT.LEAVE_LOBBY)
  handleLeaveLobby(client: Socket) {
    return this.lobbyGatewayService.onLeaveLobby(client);
  }

  @SubscribeMessage(EVENT.CHAT_MESSAGE)
  handleSendMessage(client: Socket, dto: LobbyMessageDto) {
    return this.lobbyGatewayService.onSendMessage(client, dto);
  }
}
