import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@config';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, User, connectDB } from '@shared';
import { AuthRepository } from './auth.repository';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [
      connectDB(),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          
          return {
            secret: configService.get().auth.access_token_secret,
          };
        },
        inject: [ConfigService],
      }),
      ConfigModule,
      TypeOrmModule.forFeature([Role, User, Permission]),
    ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository,
  {
    provide: 'USER_SERVICE',
    useFactory: (configService: ConfigService) => {
      const userServiceOptions = configService.get().userService; 
      return ClientProxyFactory.create(userServiceOptions!);
    },
    inject: [ConfigService],
  }],
  exports: [AuthRepository,AuthService],
})
export class AuthModule {}
