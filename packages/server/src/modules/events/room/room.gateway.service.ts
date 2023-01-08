import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
import { parseCookie } from '~/utils';
import { AuthService } from '../../auth/auth.service';
import { UsersRepository } from '../../users/users.repository';
import {
  SendOfferDto,
  SendIceCandidateDto,
  JoinRoomDto,
  LeaveRoomDto,
  SendAnswerDto,
  RoomMessageDto,
} from '../dto';

@Injectable()
export class RoomGatewayService {
  private server: Server;
  private logger = new Logger('RoomGateway');

  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
  ) {}

  /** Default Setting */

  onAfterInit(server: Server) {
    this.server = server;
    this.logger.verbose('Initialized RoomGateway');
  }

  async onConnection(client: Socket) {
    try {
      const accessToken = parseCookie(client.handshake.headers.cookie, 'access_token');
      const accessTokenPayload = await this.authService.verifyToken(accessToken, 'access_token');
      const user = await this.userRepository.findUserById(accessTokenPayload.userId);

      client.data.id = user.id;
      client.data.email = user.email;
      // this.logger.verbose(
      //   `Connected user / server_id: ${client.id}  client_id: ${client.data.email} ${client.data.id}, `,
      // );
    } catch (error) {
      this.logger.error(error.message);
      client.disconnect(true);
    }
  }

  onDisconnect(client: Socket) {
    return;
  }

  /** Socket Chat */

  onJoinRoom(client: Socket, dto: JoinRoomDto) {
    // send to all clients in room except sender
    client.join(dto.roomId);
    client.to(dto.roomId).emit(EVENT.CHAT_MESSAGE, {
      message: `Joined room ${dto.roomId} ${client.data.email}!`,
    });
    client.to(dto.roomId).emit(EVENT.NEW_USER, {
      sid: client.id,
      uid: client.data.id,
    });
  }

  onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    // send to all clients in room except sender
    client.leave(dto.roomId);
    client
      .to(dto.roomId)
      .emit(EVENT.CHAT_MESSAGE, { message: `Left room ${dto.roomId}! ${client.data.email}` });
  }

  onSendMessage(client: Socket, dto: RoomMessageDto) {
    // send to all clients in room
    this.server
      .to(dto.roomId)
      .emit(EVENT.CHAT_MESSAGE, { message: `${client.data.email}: ${dto.message}` });
  }

  /** WebRTC */

  onNewUser(client: Socket, dto: SendOfferDto) {
    client.to(dto.to).emit(EVENT.RECEIVE_OFFER, {
      offer: dto.offer,
      sid: client.id,
    });
  }
  onSendAnswer(client: Socket, dto: SendAnswerDto) {
    client.to(dto.to).emit(EVENT.RECEIVE_ANSWER, {
      answer: dto.answer,
      sid: client.id,
    });
  }
  onSendIceCandidate(client: Socket, dto: SendIceCandidateDto) {
    client.to(dto.to).emit(EVENT.RECEIVE_ICE_CANDIDATE, {
      candidate: dto.candidate,
      sid: client.id,
    });
  }
}
