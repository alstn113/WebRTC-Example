import { HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '~/prisma/prisma.service';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { isNotFoundError } from '~/prisma/utils';
import { compareHash, generateHash } from '~/utils';
import type { DecodedToken, RefreshTokenPayload, TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(res: Response, dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new HttpException('User not found', 404);

    const isPasswordMatches = await compareHash(user.password, dto.password);
    if (!isPasswordMatches) throw new HttpException('Invalid password', 400);

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken({ type: 'access_token', userId: user.id, email: user.email }),
      this.generateToken({ type: 'refresh_token', userId: user.id, email: user.email }),
    ]);

    await this.updateRtHash(user.id, refreshToken);
    this.setTokenCookies(res, accessToken, refreshToken);

    return { accessToken, refreshToken };
  }

  async logout(res: Response, userId: string) {
    try {
      await this.prisma.user.updateMany({
        where: {
          id: userId,
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      });
    } catch (error) {
      if (isNotFoundError) throw new HttpException('User not found', 404);
    } finally {
      this.clearTokenCookies(res);
    }
  }

  async refreshTokens(res: Response, refreshToken: string) {
    const refreshTokenPayload = await this.jwtService.verifyAsync<
      DecodedToken<RefreshTokenPayload>
    >(refreshToken, {
      secret: this.configService.get('refresh_token.secret'),
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id: refreshTokenPayload.userId,
      },
    });
    if (!user || !user.hashedRt) throw new HttpException('Refresh Failure', 401);

    const rtMatches = await compareHash(user.hashedRt, refreshToken);
    if (!rtMatches) throw new HttpException('Refresh Failure', 401);

    // If the refresh token is less than 15 days away, the refresh token is also renewed.
    const now = new Date().getTime();
    const diff = refreshTokenPayload.exp * 1000 - now;
    if (diff < 1000 * 60 * 60 * 24 * 15) {
      refreshToken = await this.generateToken({
        type: 'refresh_token',
        userId: user.id,
        email: user.email,
      });
      await this.updateRtHash(user.id, refreshToken);
    }

    const accessToken = await this.generateToken({
      type: 'access_token',
      userId: user.id,
      email: user.email,
    });

    this.setTokenCookies(res, accessToken, refreshToken);
    return { id: user.id, email: user.email };
  }

  setTokenCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 1, // 1h
      httpOnly: true,
    });
    res.cookie('refresh_token', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
      httpOnly: true,
    });
  }

  clearTokenCookies(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  async updateRtHash(userId: string, refreshToken: string) {
    const hash = await generateHash(refreshToken);
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedRt: hash,
        },
      });
    } catch (error) {
      if (isNotFoundError) throw new HttpException('User not found', 404);
    }
  }

  async generateToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(
      {
        type: payload.type,
        userId: payload.userId,
        email: payload.email,
      },
      {
        secret: this.configService.get(`${payload.type}`).secret,
        expiresIn: this.configService.get(`${payload.type}`).duration,
      },
    );

    return token;
  }
}
