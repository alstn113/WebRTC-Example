import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { GithubGuard } from './guards';
import { AuthService } from './service/auth.service';

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
  async githubAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return req.user;
  }
}
