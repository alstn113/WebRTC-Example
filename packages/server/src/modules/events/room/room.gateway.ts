import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
import {
  SendOfferDto,
  SendIceCandidateDto,
  JoinRoomDto,
  LeaveRoomDto,
  RoomMessageDto,
  SendAnswerDto,
  MediaStateChangeDto,
} from '../dto';
import { RoomGatewayService } from './room.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/room',
})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomGatewayService: RoomGatewayService) {}

  /** Default Setting */

  afterInit(server: Server) {
    return this.roomGatewayService.onAfterInit(server);
  }

  handleConnection(client: Socket) {
    return this.roomGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.roomGatewayService.onDisconnect(client);
  }

  /** Socket Chat */

  @SubscribeMessage(EVENT.JOIN_ROOM)
  handleJoinRoom(client: Socket, dto: JoinRoomDto) {
    return this.roomGatewayService.onJoinRoom(client, dto);
  }

  @SubscribeMessage(EVENT.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    return this.roomGatewayService.onLeaveRoom(client, dto);
  }

  @SubscribeMessage(EVENT.CHAT_MESSAGE)
  handleSendMessage(client: Socket, dto: RoomMessageDto) {
    return this.roomGatewayService.onSendMessage(client, dto);
  }

  /** WebRTC */

  @SubscribeMessage(EVENT.NEW_USER)
  handleNewUser(client: Socket, dto: SendOfferDto) {
    return this.roomGatewayService.onNewUser(client, dto);
  }

  @SubscribeMessage(EVENT.SEND_ANSWER)
  handleSendAnswer(client: Socket, dto: SendAnswerDto) {
    return this.roomGatewayService.onSendAnswer(client, dto);
  }

  @SubscribeMessage(EVENT.SEND_ICE_CANDIDATE)
  handleSendIceCandidate(client: Socket, dto: SendIceCandidateDto) {
    return this.roomGatewayService.onSendIceCandidate(client, dto);
  }

  @SubscribeMessage(EVENT.MEDIA_STATE_CHANGE)
  handleMediaStateChange(client: Socket, dto: MediaStateChangeDto) {
    return this.roomGatewayService.onMediaStateChange(client, dto);
  }
}
