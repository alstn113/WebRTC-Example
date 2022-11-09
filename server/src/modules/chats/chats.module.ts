import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';

@Module({
  providers: [PrismaService, ChatsGateway, ChatsService],
})
export class ChatsModule {}
