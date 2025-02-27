import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthGuard, ConfigModule, ConfigService, genClientKafka } from '@training/config';
import { NotificationsController } from './notification/notification.gateway';
import { WebSocketGatewayModule } from './socket/socket.module';
import { UsersController } from './user/user.gateway';
import { APP_GUARD } from '@nestjs/core';
import { AuthsController } from './auth/auth.gateway';

@Module({
  imports: [ConfigModule,
    genClientKafka(process.env.KAFKA_GROUP_ID_SERVICE as string),
    WebSocketGatewayModule
  ],
  controllers: [UsersController,NotificationsController, AuthsController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get().authService;
        // return ClientsModule.register([{name:'',...tokenServiceOptions}]);
        return ClientProxyFactory.create(authServiceOptions!);
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get().userService;        
        return ClientProxyFactory.create(userServiceOptions!);
        // return ClientsModule.register([{name:'',...userServiceOptions}]);
      },
      inject: [ConfigService],
    },
    {
      provide: 'NOTIFICATION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get().notificationServiceTCP;
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
