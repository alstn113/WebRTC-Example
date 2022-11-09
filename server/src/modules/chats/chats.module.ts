import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '~/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [PrismaService, ChatsGateway, ChatsService, UsersService, AuthService],
})
export class ChatsModule {}
