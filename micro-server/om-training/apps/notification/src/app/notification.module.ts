
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification, connectDB } from '@shared';
import { join } from 'path';
import { NotificationController } from './infrastucture/notification.controller';
import { NotificationRepository } from './infrastucture/repositories/notification.repository';
import { UsecasesProxyModule } from './infrastucture/usecase-proxy/usecase-proxy.module';
import { genClientMailer } from '@config';
@Global()
@Module({
  imports:[connectDB(), TypeOrmModule.forFeature([Notification]),
  genClientMailer(),
  UsecasesProxyModule.register(),
  ],
  controllers: [NotificationController],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationModule {}
