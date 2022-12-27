import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { RoomsGateway } from './rooms.gateway';

@Injectable()
export class RoomsGatewayService {
  constructor(private readonly authService: AuthService) {}

  private server: Server;

  onGatewayInit(server: Server) {
    this.server = server;
  }

  onGatewayConnection(client: Socket) {
    return;
  }

  onGatewayDisconnect(client: Socket) {
    return;
  }
}
