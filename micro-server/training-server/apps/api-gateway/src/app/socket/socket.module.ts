import { Module } from '@nestjs/common';
import { WebSocketEventGateway } from './socket.gateway';

@Module({
  providers: [WebSocketEventGateway],
  exports: [WebSocketEventGateway],
})
export class WebSocketGatewayModule {}
