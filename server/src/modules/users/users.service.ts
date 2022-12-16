import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    /** @todo handle error */
    return this.prisma.user.create({ data: dto });
  }

  async findUsers() {
    /** @todo handle error */
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async deleteUserById(id: string) {
    /** @todo handle NotFound */
    return await this.prisma.user.delete({ where: { id } });
  }
}
