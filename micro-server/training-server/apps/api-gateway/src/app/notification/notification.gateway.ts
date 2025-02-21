import { AuthGuard } from '@config';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Put,
  UseGuards
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  GetNotificationByUserResponse,
  IServiceGetNotificationByUser,
  updateMessageResponse
} from '@shared';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '@config';
import { HttpStatusCode } from 'axios';
  @Controller('notifications')
  @UseGuards(AuthGuard)
  export class NotificationsController {
    constructor(
      @Inject('NOTIFICATION_SERVICE') private readonly notificationServiceClient: ClientProxy,
    ) {}
  
    @Get(':id')
    @Authorization(true)
    public async getMessageByUser(
      @Param('id') id: number
    ): Promise<GetNotificationByUserResponse> {
      const notificationResponse: IServiceGetNotificationByUser = await firstValueFrom(
        this.notificationServiceClient.send('Get_Message_By_userId', id)
      );
      return {
        status: notificationResponse.status,
        message: notificationResponse.message,
        notifications: notificationResponse.notifications,
        notifiIsSeenCount:notificationResponse.notifiIsSeenCount,
        errors: null,
      };
    }
    @Put()
    @Authorization(true)
    public async udpateMessageIsSeen(
      @Body() ids:number[]
    ): Promise<updateMessageResponse> {
      firstValueFrom(
        this.notificationServiceClient.send('update_Message', ids)
      );
      return {
        status: HttpStatusCode.Ok,
        message: 'update message successful',
        errors: null,
      };
    }
    @Delete(':id')
    @Authorization(true)
    public async deleteMessageById(
      @Param('id') id: number
    ): Promise<any> {
  
      const userResponse: any = await firstValueFrom(
        this.notificationServiceClient.send({cmd:'Delete_Message'}, id)
      );
  
      if (userResponse.status === 'error') {
        throw new HttpException(userResponse.message, userResponse.status);
        }
        
      return {
        status: userResponse.status,
        message: 'Successfully deleted the user!',
        data: null,
      };
    }

    @Delete(':id')
    @Authorization(true)
    public async deleteMessageByUserId(
      @Param('id') id: number
    ): Promise<any> {
  
      const userResponse: any = await firstValueFrom(
        this.notificationServiceClient.send({cmd:'Delete_Message_by_UserId'}, id)
      );
  
      if (userResponse.status === 'error') {
        throw new HttpException(userResponse.message, userResponse.status);
        }
        
      return {
        status: userResponse.status,
        message: 'Successfully deleted the user!',
        data: null,
      };
    }
  
  }
    