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
  SendMessageDto,
  MakeAnswerDto,
} from '../dto';
import { RoomsGatewayService } from './rooms.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/rooms',
})
export class RoomsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomsGatewayService: RoomsGatewayService) {}

  /** Default Setting */

  afterInit(server: Server) {
    return this.roomsGatewayService.onGatewayInit(server);
  }

  handleConnection(client: Socket) {
    return this.roomsGatewayService.onGatewayConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.roomsGatewayService.onGatewayDisconnect(client);
  }

  /** Socket Chat */

  @SubscribeMessage(EVENT.JOIN_ROOM)
  handleJoinRoom(client: Socket, dto: JoinRoomDto) {
    return this.roomsGatewayService.onJoinRoom(client, dto);
  }

  @SubscribeMessage(EVENT.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    return this.roomsGatewayService.onLeaveRoom(client, dto);
  }

  @SubscribeMessage(EVENT.SEND_MESSAGE)
  handleSendMessage(client: Socket, dto: SendMessageDto) {
    return this.roomsGatewayService.onSendMessage(client, dto);
  }

  /** WebRTC */

  @SubscribeMessage(EVENT.CALL_USER)
  handleCallUser(client: Socket, dto: CallUserDto) {
    return this.roomsGatewayService.onCallUser(client, dto);
  }

  @SubscribeMessage(EVENT.MAKE_ANSWER)
  handleMakeAnswer(client: Socket, dto: MakeAnswerDto) {
    return this.roomsGatewayService.onMakeAnswer(client, dto);
  }

  @SubscribeMessage(EVENT.ICE_CANDIDATE)
  handleIceCandidate(client: Socket, dto: IceCandidateDto) {
    return this.roomsGatewayService.onIceCandidate(client, dto);
  }
}
