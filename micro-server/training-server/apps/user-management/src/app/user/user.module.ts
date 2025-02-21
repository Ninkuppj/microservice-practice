import { AuthGuardModule, ConfigModule, ConfigService, genClientKafka } from '@config';
import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@shared';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),ConfigModule,
    genClientKafka(process.env.KAFKA_GROUP_ID_SERVICE as string),
    AuthGuardModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService,
    {
      provide: 'NOTIFICATIONS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get().notificationService;        
      return ClientsModule.register([userServiceOptions]);
      },
      inject: [ConfigService],
    },
    {
    provide: 'USER_SERVICE',
    useFactory: (configService: ConfigService) => {
      const userServiceOptions = configService.get().userService; 
      return ClientProxyFactory.create(userServiceOptions!);
    },
    inject: [ConfigService],
  },
  {
    provide: 'AUTH_SERVICE',
    useFactory: (configService: ConfigService) => {
      const authServiceOptions = configService.get().authService; 
      return ClientProxyFactory.create(authServiceOptions!);
    },
    inject: [ConfigService],
  }
  ],
  exports: [UserRepository,UserService],
})
export class UserModule {}
