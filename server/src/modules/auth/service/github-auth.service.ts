import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '~/prisma/prisma.service';
import { AuthService } from './auth.service';

@Injectable()
export class GithubAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly authServcie: AuthService,
  ) {}
}
