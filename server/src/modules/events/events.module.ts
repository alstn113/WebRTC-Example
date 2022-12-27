import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { RoomsGateway } from './rooms.gateway';
import { RoomsGatewayService } from './rooms.gateway.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [RoomsGateway, RoomsGatewayService, AuthService, UsersRepository],
})
export class EventsModule {}
