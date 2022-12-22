import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatsGateway } from './chats.gateway';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '~/prisma/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [ChatsGateway, AuthService, UsersService, PrismaService],
})
export class ChatsModule {}
