import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { UsersRepository } from '~/modules/users/users.repository';
import type { GithubProfile } from '../types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    readonly configService: ConfigService,
    private readonly userRepository: UsersRepository,
  ) {
    const GITHUB_CLIENT_ID = configService.get<string>('github.client_id');
    const GITHUB_CLIENT_SECRET = configService.get<string>('github.client_secret');
    const GITHUB_CALLBACK_URL = configService.get<string>('github.callback_url');

    super({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { id, email }: GithubProfile = profile._json;
    try {
      const exUser = await this.userRepository.findUserByEmail(email);
      if (exUser) {
        return done(null, {
          id: exUser.id,
          email: exUser.email,
        });
      }

      const newUser = await this.userRepository.createOAuthUser({
        email,
        provider: 'github',
        socialId: id.toString(),
      });

      return done(null, {
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      done(error);
    }
  }
}
