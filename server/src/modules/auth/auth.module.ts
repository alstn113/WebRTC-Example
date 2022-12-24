import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
