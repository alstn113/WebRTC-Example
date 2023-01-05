import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
import { parseCookie } from '~/utils';
import { AuthService } from '../../auth/auth.service';
import { UsersRepository } from '../../users/users.repository';
import {
  CallUserDto,
  IceCandidateDto,
  JoinRoomDto,
  LeaveRoomDto,
  MakeAnswerDto,
  SendMessageDto,
} from '../dto';

@Injectable()
export class RoomsGatewayService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
  ) {}

  private server: Server;
  private logger = new Logger('RoomsGateway');

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
    client
      .to(dto.roomId)
      .emit(EVENT.RECEIVE_MESSAGE, `Joined room ${dto.roomId} ${client.data.user.email}!`);
    client.to(dto.roomId).emit(EVENT.CALL_USER, {
      sid: client.id,
    });
  }

  onLeaveRoom(client: Socket, dto: LeaveRoomDto) {
    // send to all clients in room except sender
    client.leave(dto.roomId);
    client
      .to(dto.roomId)
      .emit(EVENT.RECEIVE_MESSAGE, `Left room ${dto.roomId}! ${client.data.user.email}`);
  }

  onSendMessage(client: Socket, dto: SendMessageDto) {
    // send to all clients in room
    this.server
      .to(dto.roomId)
      .emit(EVENT.RECEIVE_MESSAGE, `${client.data.user.email}: ${dto.message}`);
  }

  /** WebRTC */

  onCallUser(client: Socket, dto: CallUserDto) {
    client.to(dto.to).emit(EVENT.CALL_MADE, {
      offer: dto.offer,
      sid: client.id,
    });
  }
  onMakeAnswer(client: Socket, dto: MakeAnswerDto) {
    client.to(dto.to).emit(EVENT.ANSWER_MADE, {
      answer: dto.answer,
      sid: client.id,
    });
  }
  onIceCandidate(client: Socket, dto: IceCandidateDto) {
    client.to(dto.to).emit(EVENT.ICE_CANDIDATE, {
      candidate: dto.candidate,
      sid: client.id,
    });
  }
}
