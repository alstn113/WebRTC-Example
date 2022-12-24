import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ email, password }: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
