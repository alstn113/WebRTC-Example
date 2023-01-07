import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { RoomGateway, RoomGatewayService } from './room';
import { LobbyGateway, LobbyGatewayService } from './lobby';
@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    UsersRepository,
    // room
    RoomGateway,
    RoomGatewayService,
    // lobby
    LobbyGateway,
    LobbyGatewayService,
  ],
})
export class EventsModule {}
