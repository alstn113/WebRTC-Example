import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { GithubGuard } from './guards';
import { AuthService } from './auth.service';
import { GetCurrentUser } from '~/common/decorators/get-current-user.decorator';

@Controller('/auth')
@ApiTags('/auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('/github')
  @UseGuards(GithubGuard)
  async githubAuth() {
    return 'Github Redirect';
  }

  @Get('/github/callback')
  @UseGuards(GithubGuard)
  async githubAuthCallback(@Res() res: Response, @GetCurrentUser() user) {
    const REDIRECT_URI = this.configService.get<string>('client');
    const accessToken = await this.authService.getAccessToken(user.id, user.email);

    return res.redirect(`${REDIRECT_URI}/?access_token=${accessToken}`);
  }
}
