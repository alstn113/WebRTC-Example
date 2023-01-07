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
  CallUserDto,
  IceCandidateDto,
  JoinRoomDto,
  LeaveRoomDto,
  RoomMessageDto,
  MakeAnswerDto,
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
    return this.roomGatewayService.onGatewayInit(server);
  }

  handleConnection(client: Socket) {
    return this.roomGatewayService.onGatewayConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.roomGatewayService.onGatewayDisconnect(client);
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

  @SubscribeMessage(EVENT.CALL_USER)
  handleCallUser(client: Socket, dto: CallUserDto) {
    return this.roomGatewayService.onCallUser(client, dto);
  }

  @SubscribeMessage(EVENT.MAKE_ANSWER)
  handleMakeAnswer(client: Socket, dto: MakeAnswerDto) {
    return this.roomGatewayService.onMakeAnswer(client, dto);
  }

  @SubscribeMessage(EVENT.ICE_CANDIDATE)
  handleIceCandidate(client: Socket, dto: IceCandidateDto) {
    return this.roomGatewayService.onIceCandidate(client, dto);
  }
}
