import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { RoomsGateway, RoomsGatewayService } from './rooms';
import { LobbyGateway, LobbyGatewayService } from './lobby';
@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    UsersRepository,
    // rooms
    RoomsGateway,
    RoomsGatewayService,
    // lobby
    LobbyGateway,
    LobbyGatewayService,
  ],
})
export class EventsModule {}
