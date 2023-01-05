import { HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { isNotFoundError } from '~/prisma/utils';
import { compareHash, generateHash } from '~/utils';
import type { DecodedToken, TokenPayload, TokenType } from './types';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UsersRepository,
  ) {}

  async login(res: Response, dto: LoginUserDto) {
    const user = await this.userRepository.findUserByEmail(dto.email);
    if (!user) throw new HttpException('User not found', 404);

    const isPasswordMatches = await compareHash(user.password, dto.password);
    if (!isPasswordMatches) throw new HttpException('Invalid password', 400);

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken({ type: 'access_token', userId: user.id, email: user.email }),
      this.generateToken({ type: 'refresh_token', userId: user.id, email: user.email }),
    ]);

    await this.updateHashedRt(user.id, refreshToken);
    this.setTokenCookies(res, accessToken, refreshToken);

    return { accessToken, refreshToken };
  }

  async oauthLogin(res: Response, user: { id: string; email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken({ type: 'access_token', userId: user.id, email: user.email }),
      this.generateToken({ type: 'refresh_token', userId: user.id, email: user.email }),
    ]);

    await this.updateHashedRt(user.id, refreshToken);
    this.setTokenCookies(res, accessToken, refreshToken);
    return;
  }

  async logout(res: Response, userId: string) {
    try {
      await this.userRepository.deleteHashedRt(userId);
    } catch (error) {
      if (isNotFoundError) throw new HttpException('User not found', 404);
    } finally {
      this.clearTokenCookies(res);
    }
  }

  async refreshTokens(res: Response, refreshToken: string) {
    const refreshTokenPayload = await this.verifyToken(refreshToken, 'refresh_token');
    const user = await this.userRepository.findUserById(refreshTokenPayload.userId);
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
      await this.updateHashedRt(user.id, refreshToken);
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

  async updateHashedRt(userId: string, refreshToken: string) {
    const hashRt = await generateHash(refreshToken);
    try {
      await this.userRepository.updateHashedRt(userId, hashRt);
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
        secret: this.configService.get(`${payload.type}.secret`),
        expiresIn: this.configService.get(`${payload.type}.duration`),
      },
    );

    return token;
  }

  async verifyToken(token: string, type: TokenType) {
    try {
      //TODO: 여기 jwt type "TokenPayload" 수정하기
      const decodedToken = await this.jwtService.verifyAsync<DecodedToken<TokenPayload>>(token, {
        secret: this.configService.get(`${type}.secret`),
      });
      return decodedToken;
    } catch (error) {
      throw new HttpException('Invalid token', 401);
    }
  }
}
