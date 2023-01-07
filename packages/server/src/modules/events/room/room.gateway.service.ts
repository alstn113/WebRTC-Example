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
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
  ) {}

  private server: Server;
  private logger = new Logger('RoomGateway');

  /** Default Setting */

  onGatewayInit(server: Server) {
    this.server = server;
    this.logger.verbose('Initialized RoomGateway');
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

      // this.logger.verbose(`Connected user client_id: ${user.id}, server_id: ${client.id}`);
    } catch (error) {
      this.logger.error(error.message);
      client.disconnect(true);
    }
  }

  onGatewayDisconnect(client: Socket) {
    return;
  }

  /** Socket Chat */

  onJoinRoom(client: Socket, dto: JoinRoomDto) {
    // send to all clients in room except sender
    client.join(dto.roomId);
    client.to(dto.roomId).emit(EVENT.CHAT_MESSAGE, {
      message: `Joined room ${dto.roomId} ${client.data.user.email}!`,
    });
    client.to(dto.roomId).emit(EVENT.NEW_USER, {
      sid: client.id,
      uid: client.data.user.id,
    });
  }

  onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    // send to all clients in room except sender
    client.leave(dto.roomId);
    client
      .to(dto.roomId)
      .emit(EVENT.CHAT_MESSAGE, { message: `Left room ${dto.roomId}! ${client.data.user.email}` });
  }

  onSendMessage(client: Socket, dto: RoomMessageDto) {
    // send to all clients in room
    this.server
      .to(dto.roomId)
      .emit(EVENT.CHAT_MESSAGE, { message: `${client.data.user.email}: ${dto.message}` });
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
