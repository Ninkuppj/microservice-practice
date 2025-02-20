/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@config';
import { NotificationModule } from './app/notification.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.connectMicroservice({
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get().port,
    },
  })
  const config = new DocumentBuilder()
  .setTitle('Notifications APIs')
  .setDescription('The Notifications API description')
  .setVersion('1.0')
  .addTag('notifications-managerment')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/notifications', app, document);
  const kafkaMicroservice = await NestFactory.createMicroservice(NotificationModule,{
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers:  [process.env.KAFKA_SERVICE_BROKERS],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID_SERVICE,
        allowAutoTopicCreation: true,
      }
    }
  })
  await app.listen(new ConfigService().get().port)
  await kafkaMicroservice.listen();
  Logger.log(
    `🚀 Application is running on: http://localhost:${new ConfigService().get().port}`
  );

}

bootstrap();
