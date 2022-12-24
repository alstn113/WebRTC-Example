import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteHashedRt(userId: string) {
    return await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async updateHashedRt(userId: string, hashedRt: string) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt,
      },
    });
  }
}
