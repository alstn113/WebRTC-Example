import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetCurrentUser, Public } from '~/common/decorators';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { GithubGuard } from './guards';

@ApiTags('/auth')
@Public()
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginUserDto) {
    return await this.authService.login(res, dto);
  }

  @Get('/github')
  @UseGuards(GithubGuard)
  async githubAuth() {
    return 'login with github';
  }

  @Get('/github/callback')
  @UseGuards(GithubGuard)
  async githubAuthCallback(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUser() user: { id: string; email: string },
  ) {
    const REDIRECT_URI = this.configService.get<string>('client');
    await this.authService.oauthLogin(res, user);
    return res.redirect(REDIRECT_URI);
  }

  @Delete('/logout')
  async logout(@Res({ passthrough: true }) res: Response, @GetCurrentUser('id') userId: string) {
    return this.authService.logout(res, userId);
  }
}
