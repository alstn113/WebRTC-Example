import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';

@Module({
  controllers: [ChatsController],
  providers: [ChatsGateway, PrismaService],
})
export class ChatsModule {}
