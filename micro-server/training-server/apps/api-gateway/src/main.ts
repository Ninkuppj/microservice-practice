/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@training/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    credentials: true
  })
  await app.listen(Number(new ConfigService().get().port));
  
  Logger.log(`🚀 Application is running on: http://localhost:${new ConfigService().get().port}/${globalPrefix}`);
}

bootstrap();
