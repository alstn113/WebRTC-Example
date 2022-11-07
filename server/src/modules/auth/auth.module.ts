import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService, GithubStrategy],
})
export class AuthModule {}
