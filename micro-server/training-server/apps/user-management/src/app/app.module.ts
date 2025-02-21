import { ConfigModule } from '@config';
import { Module } from '@nestjs/common';
import { connectDB } from '@shared';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    connectDB(),
    UserModule,
    ConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
