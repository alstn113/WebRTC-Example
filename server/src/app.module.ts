import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '~/config/configuration';
import { PrismaModule } from '~/prisma/prisma.module';

// main modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ChatsModule } from '~/modules/chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,

    // main modules
    AuthModule,
    UsersModule,
    RoomsModule,
    ChatsModule,
  ],
})
export class AppModule {}
