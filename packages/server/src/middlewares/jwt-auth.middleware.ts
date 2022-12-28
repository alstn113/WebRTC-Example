import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '~/modules/auth/auth.service';
import type { AccessTokenPayload, DecodedToken } from '~/modules/auth/types';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    try {
      if (!accessToken) throw new HttpException('Access token not found', 401);
      const accessTokenPayload = await this.jwtService.verifyAsync<
        DecodedToken<AccessTokenPayload>
      >(accessToken, {
        secret: this.configService.get<string>('access_token.secret'),
      });
      req.user = { id: accessTokenPayload.userId, email: accessTokenPayload.email };
      const now = new Date().getDate();
      const diff = accessTokenPayload.exp - now;
      if (diff < 1000 * 60 * 30 && refreshToken) {
        await this.authService.refreshTokens(res, refreshToken);
      }
    } catch (error) {
      if (!refreshToken) {
        req.user = null;
        return next();
      }
      try {
        const { id, email } = await this.authService.refreshTokens(res, refreshToken);
        req.user = { id, email };
      } catch (error) {
        req.user = null;
      }
    }
    return next();
  }
}
