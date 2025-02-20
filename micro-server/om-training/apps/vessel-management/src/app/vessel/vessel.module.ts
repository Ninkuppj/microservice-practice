import { Module } from '@nestjs/common';

import { VesselController } from './vessel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VesselService } from './vessel.service';
import { AuthGuardModule, ConfigModule, ConfigService } from '@config';
import { Vessel, connectDB } from '@shared';
import { VesselRepository } from './vessel.repository';
import { ClientProxyFactory } from '@nestjs/microservices';
@Module({
  imports: [ 
  connectDB(),
  ConfigModule,
  TypeOrmModule.forFeature([VesselRepository, Vessel]),
  AuthGuardModule.forRoot(),],
  controllers: [VesselController],
  providers: [VesselRepository,VesselService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get().authService; 
        console.log(userServiceOptions);
               
        return ClientProxyFactory.create(userServiceOptions!);
      },
      inject: [ConfigService],
    }],
})
export class VesselModule {}
