import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateRoomDto } from './dto';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findRoomById(id: string) {
    return this.prisma.room.findUnique({
      where: {
        id,
      },
    });
  }

  async findRooms() {
    return this.prisma.room.findMany({});
  }

  async createRoom(dto: CreateRoomDto, userId: string) {
    return await this.prisma.room.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async deleteRoomById(id: string) {
    return await this.prisma.room.delete({
      where: {
        id,
      },
    });
  }
}
