import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ForbiddenException, Injectable } from '@nestjs/common';
import { decode } from 'punycode';
import { decodeToken } from '@config';
  
  @Injectable()
  @WebSocketGateway({ cors: {
    origin: '*', 
  }, })
  export class WebSocketEventGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer()
      server!: Server;
  
    handleEmitSocket({ data, event, to }:any) {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
  
    @SubscribeMessage('force_reload')
    async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data:any) {
      setTimeout(()=> {
        this.server.to(data.userId).emit('message', data);
      },3000)
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    afterInit(socket: Socket): any {}
  
    async handleConnection(socket: Socket) {
      // console.log('connect', socket.id);
      const authHeader = socket.handshake.headers.authorization;
      // console.log('authHeader:',authHeader);
      if (authHeader && (authHeader as string).split(' ')[1]) {
        
        try {
          const token = (authHeader as string).split(' ')[1];

          const decoded:any = await decodeToken(token);
          if (!decoded) {
            throw new ForbiddenException();
          }
          
          socket.data.roleId = decoded?.roleId;
          socket.data.userId = decoded?.userId;
          socket.join([socket.data.roleId, socket.data.userId]);
          console.log('connect success', [
            socket.data.roleId,
            socket.data.userId,
          ]);
        } catch (e) {
          socket.disconnect();
        }
      } else {
        socket.disconnect();
      }
    }
  
    async handleDisconnect(@ConnectedSocket() socket: Socket) {
      console.log('disconnect', socket.id, socket.data.userId);
    }
  }
  