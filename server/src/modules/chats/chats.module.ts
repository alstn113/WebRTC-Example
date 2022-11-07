import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';

@Module({
  controllers: [ChatsController],
  providers: [PrismaService, ChatsGateway, ChatsService],
})
export class ChatsModule {}
