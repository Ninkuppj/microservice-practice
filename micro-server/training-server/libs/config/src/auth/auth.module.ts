import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthGuard, ConfigModule, ConfigService } from '@config';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
@Global()
@Module({
  imports: [    
    JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return {
        secret: configService.get().auth.access_token_secret,
      };
    },
    inject: [ConfigService],
  }),ConfigModule

],
  providers: [
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
        provide: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => {
          const userServiceOptions = configService.get().authService;
          console.log(userServiceOptions);
          
          return ClientProxyFactory.create(userServiceOptions!);
          // return ClientsModule.register([{name:'',...userServiceOptions}]);
        },
        inject: [ConfigService],
      },
  ]
})

export class AuthGuardModule {
    static forRoot():  DynamicModule  {

       return {
           module: AuthGuardModule,
           global: true,
           providers: [AuthGuard,JwtService],
           exports:[AuthGuard,
                    JwtService
                    ]
       };
   }
}
