import { HttpException, Injectable } from '@nestjs/common';
import { isAlreadyExistsError } from '~/prisma/utils';
import { CreateUserDto } from './dto';
import { PrismaService } from '~/prisma/prisma.service';
import { generateHash } from '~/utils';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await generateHash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      });

      return user;
    } catch (err) {
      if (isAlreadyExistsError) {
        throw new HttpException('User already exists', 400);
      }
    }
  }

  async getCurrentUser(user: User) {
    return {
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
