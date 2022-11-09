import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAccessToken(userId: number, email: string) {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('auth.access_token_secret');
    const ACCESS_TOKEN_EXPIRE = this.configService.get<string>('auth.access_token_expire');

    const payload = { type: 'access_token', userId, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: ACCESS_TOKEN_SECRET,
      expiresIn: ACCESS_TOKEN_EXPIRE,
    });

    return accessToken;
  }

  async getRefreshToken(userId: number, email: string) {
    const REFRESH_TOKEN_SECRET = this.configService.get<string>('auth.refresh_token_secret');
    const REFRESH_TOKEN_EXPIRE = this.configService.get<string>('auth.refresh_token_expire');

    const payload = { type: 'refresh_token', userId, email };

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRE,
    });

    return refresh_token;
  }

  async verifyAccessToken(accessToken: string) {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('auth.access_token_secret');

    try {
      const payload = await this.jwtService.verify(accessToken, {
        secret: ACCESS_TOKEN_SECRET,
      });

      return payload;
    } catch (err) {
      return null;
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    const REFRESH_TOKEN_SECRET = this.configService.get<string>('auth.refresh_token_secret');

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: REFRESH_TOKEN_SECRET,
    });

    return payload;
  }
}
