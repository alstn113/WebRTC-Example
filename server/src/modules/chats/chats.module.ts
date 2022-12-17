import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [JwtModule.register({})],
  providers: [ChatsGateway],
})
export class ChatsModule {}
