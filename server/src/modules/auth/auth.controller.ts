import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './service/auth.service';
import { GithubAuthService } from './service/github-auth.service';

@Controller('/auth')
@ApiTags('/auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly githubAuthService: GithubAuthService,
  ) {}
}
