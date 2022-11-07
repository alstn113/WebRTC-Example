import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import configuration from '~/config/configuration';
import { PrismaModule } from '~/prisma/prisma.module';

// main modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ChatsModule } from '~/modules/chats/chats.module';
import { PostsModule } from '~/modules/posts/posts.module';

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
    PostsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
