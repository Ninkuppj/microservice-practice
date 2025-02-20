/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const tcpMicroservice = await NestFactory.createMicroservice<TcpOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 5050,
    },
  });
  tcpMicroservice.listen();

}

bootstrap();
