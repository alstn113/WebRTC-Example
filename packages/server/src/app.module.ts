import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthConfig, EnvConfig, JwtConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

// middlewares
import { JwtAuthMiddleware } from './middlewares/jwt-auth.middleware';

// providers
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

// main modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig, JwtConfig, AuthConfig],
    }),
    JwtModule.register({}),
    PrismaModule,

    // main modules
    AuthModule,
    UsersModule,
    RoomsModule,
    EventsModule,
  ],

  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
