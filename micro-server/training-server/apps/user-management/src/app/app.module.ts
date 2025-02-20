import { ConfigModule, ConfigService } from '@config';
import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { connectDB } from '@shared';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    connectDB(),
    UserModule,
    ConfigModule
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule {}
