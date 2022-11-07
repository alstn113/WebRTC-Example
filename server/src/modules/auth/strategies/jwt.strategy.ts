import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configServcie: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({});
  }
}
