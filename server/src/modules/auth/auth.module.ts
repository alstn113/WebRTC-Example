import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategies';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService, GithubStrategy, UsersService],
})
export class AuthModule {}
