import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '~/app.module';
import { setupSwagger } from '~/utils/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port');
  const logger = new Logger();

  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('client'),
    credentials: true,
  });

  setupSwagger(app);
  await app.listen(port);
  logger.verbose(`Listening On Port ${port}`);
}
bootstrap();
