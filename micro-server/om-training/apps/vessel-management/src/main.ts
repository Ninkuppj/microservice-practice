/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
require('dotenv').config();
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { VesselModule } from './app/vessel/vessel.module';
import { ConfigService } from '@config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(VesselModule);
  app.connectMicroservice({
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get().port,
    },
  })
  const config = new DocumentBuilder()
    .setTitle('Vessel API')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .addTag('vessel-managerment')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/vessels', app, document);
  Logger.log(`🚀 Application is running on: http://localhost:${new ConfigService().get().port}/`);
  await app.listen(Number(new ConfigService().get().port));
}

bootstrap();
