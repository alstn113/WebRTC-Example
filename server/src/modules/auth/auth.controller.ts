import { Controller, Get, HttpStatus, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { GithubGuard } from './guards';
import { AuthService } from './auth.service';

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
  async githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    const REDIRECT_URI = this.configService.get<string>('client');
    return res.redirect(encodeURI(REDIRECT_URI));
  }
}
