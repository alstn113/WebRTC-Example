import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class AuthService {
  readonly ACCESS_TOKEN_SECRET = this.configService.get<string>('auth.access_token_secret');
  readonly ACCESS_TOKEN_EXPIRE = this.configService.get<string>('auth.access_token_expire');

  readonly REFRESH_TOKEN_SECRET = this.configService.get<string>('auth.refresh_token_secret');
  readonly REFRESH_TOKEN_EXPIRE = this.configService.get<string>('auth.refresh_token_expire');

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAccessToken(userId: number, email: string) {
    const payload = { sub: 'access_token', userId, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.ACCESS_TOKEN_SECRET,
      expiresIn: this.ACCESS_TOKEN_EXPIRE,
    });

    return accessToken;
  }

  async getRefreshToken(userId: number, email: string) {
    const payload = { sub: 'refresh_token', userId, email };

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.REFRESH_TOKEN_SECRET,
      expiresIn: this.REFRESH_TOKEN_EXPIRE,
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
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.REFRESH_TOKEN_SECRET,
    });

    return payload;
  }
}
