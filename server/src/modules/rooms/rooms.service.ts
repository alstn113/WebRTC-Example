import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(dto: CreateRoomDto, user: User) {
    const room = await this.prisma.room.create({
      data: {
        ...dto,
        ownerId: user.id,
      },
    });

    return room;
  }

  async findAllRooms() {
    const rooms = await this.prisma.room.findMany({
      select: roomSelector,
    });

    return rooms;
  }

  async findRoomById(id: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
      select: roomSelector,
    });
    if (!room) throw new NotFoundException();
    return room;
  }

  async deleteRoomById(id: string, user: User) {
    const room = await this.prisma.room.delete({
      where: {
        id,
      },
    });
    if (!room) throw new NotFoundException();
    if (room.ownerId !== user.id) throw new UnauthorizedException();

    return `Room with id ${id} deleted`;
  }
}

const roomSelector = {
  id: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: {
      id: true,
      username: true,
      email: true,
    },
  },
};
