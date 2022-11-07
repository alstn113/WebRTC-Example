import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers: [PrismaService, RoomsService],
})
export class RoomsModule {}
