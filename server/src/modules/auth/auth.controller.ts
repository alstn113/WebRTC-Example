import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetCurrentUser, Public } from '~/common/decorators';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';

@ApiTags('/auth')
@Public()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginUserDto) {
    return await this.authService.login(res, dto);
  }

  @Delete('/logout')
  async logout(@Res({ passthrough: true }) res: Response, @GetCurrentUser('id') userId: string) {
    return this.authService.logout(res, userId);
  }
}
