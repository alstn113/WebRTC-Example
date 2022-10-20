import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '~/app.module';
import { setupSwagger } from '~/utils/setupSwagger';
import { SocketIoAdapter } from '~/adapters/socke-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port');
  const logger = new Logger();

  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('client'),
    credentials: true,
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  setupSwagger(app);
  await app.listen(port);
  logger.verbose(`Listening On Port ${port}`);
}
bootstrap();
