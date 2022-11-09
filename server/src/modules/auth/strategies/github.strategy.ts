import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { UsersService } from '~/modules/users/users.service';
import { PrismaService } from '~/prisma/prisma.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configServcie: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {
    const GIT_CLIENT_ID = configServcie.get<string>('auth.github.client_id');
    const GIT_CLIENT_SECRET = configServcie.get<string>('auth.github.client_secret');
    const GIT_CALLBACK_URL = configServcie.get<string>('auth.github.callback_url');

    super({
      clientID: GIT_CLIENT_ID,
      clientSecret: GIT_CLIENT_SECRET,
      callbackURL: GIT_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(_accessToken, _refreshToken, profile, done) {
    const { node_id, email, name }: profileJson = profile._json;

    // User Exists
    const exUser = await this.prisma.user.findFirst({
      where: {
        socialId: node_id,
      },
    });
    if (exUser) return done(null, exUser);

    // User Not Found And Create New User
    const newUser = this.usersService.createUser({
      socialId: node_id,
      email,
      provider: 'github',
      username: name,
    });
    return done(null, newUser);
  }
}

type profileJson = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string | null;
  email: string;
  hireable: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};
