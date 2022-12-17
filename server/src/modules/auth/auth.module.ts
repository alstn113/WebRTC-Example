import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GithubStrategy, JwtStrategy } from './strategies';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy, GithubStrategy, UsersService],
})
export class AuthModule {}
