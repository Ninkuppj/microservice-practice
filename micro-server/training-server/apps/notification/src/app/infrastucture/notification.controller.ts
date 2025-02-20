import { Controller, Get, Delete, Param, Body, HttpStatus, Put, Post, Inject, ParseIntPipe } from '@nestjs/common';
import { GetNotificationByUserResponse, INotification, Notification, NotificationDTO } from '@shared';
import { EventPattern } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { UsecasesProxyModule } from './usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from './usecase-proxy/usecase-proxy';
import { AddNotificationUseCases, DeleteNotificationByUserUseCases, DeleteNotificationUseCases, GetNotificationByUserUseCases, UpdateNotificationUseCases } from '../use-cases';
import { CountNotificationUseCases } from '../use-cases/count-notification-seen.usecase';
import { CONSTANTS } from '@config';
import { NotificationService } from './services/notification.service';

@Controller()
export class NotificationController {
  constructor(
    @Inject(UsecasesProxyModule.GET_NOTIFICATIONS_USECASES_PROXY)
    private readonly getNoTificationsUseCaseProxy: UseCaseProxy<GetNotificationByUserUseCases>,
    @Inject(UsecasesProxyModule.POST_NOTIFICATION_USECASES_PROXY)
    private readonly addNoTificationUseCaseProxy: UseCaseProxy<AddNotificationUseCases>,
    @Inject(UsecasesProxyModule.COUNT_NOTIFICATIONS_USECASES_PROXY)
    private readonly countNoTificationUseCaseProxy: UseCaseProxy<CountNotificationUseCases>,
    @Inject(UsecasesProxyModule.PUT_NOTIFICATION_USECASES_PROXY)
    private readonly updateNoTificationUseCaseProxy: UseCaseProxy<UpdateNotificationUseCases>,
    @Inject(UsecasesProxyModule.DELETE_NOTIFICATION_BY_USER_USECASES_PROXY)
    private readonly deleteNoTificationByUserUseCaseProxy: UseCaseProxy<DeleteNotificationByUserUseCases>,
    @Inject(UsecasesProxyModule.DELETE_NOTIFICATION_USECASES_PROXY)
    private readonly deleteNoTificationUseCaseProxy: UseCaseProxy<DeleteNotificationUseCases>,
    private readonly mailerService: MailerService
    ) {}

  // @MessagePattern({cmd: 'Get_Message_By_Id_TCP'})
  // @EventPattern('Get_Message_By_Id')
  @Get(':id')
  async findOne(@Param('id' , ParseIntPipe) id: number) {
    return await this.getNoTificationsUseCaseProxy.getInstance().execute(id);
  }
  
  // @MessagePattern({cmd: 'Get_Message_By_userId_TCP'})
  @EventPattern('Get_Message_By_userId')
  @Get('/user/:id')
  async findMessageByUser (@Param('id', ParseIntPipe) userId: number): Promise<GetNotificationByUserResponse>{
    console.log(userId);
    
    const notifications:INotification[] = await this.getNoTificationsUseCaseProxy.getInstance().execute(userId);
    const countNotifi:number = await this.countNoTificationUseCaseProxy.getInstance().execute(userId)
    
    if(notifications){
    return {
      status: HttpStatus.OK,
      message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
      notifications:notifications,
      notifiIsSeenCount:countNotifi
    }
  } else {
    return {
      status:HttpStatus.FORBIDDEN,
      message:CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND
      };
  }
  }

  @EventPattern('Create_Message')
  @Post()
  async create(@Body() notification: NotificationDTO) {
    const mail = {
      // to:notification.email,
      to:'mun01208183826@gmail.com',
      subject:'Welcome to Training App! Confirm your Email',
      template: './notification', // either change to ./transactional or rename transactional.html to confirmation.html
      context: {
        name: notification.email,
      },
    }
    await this.mailerService.sendMail(mail);
    return this.addNoTificationUseCaseProxy.getInstance().execute(notification);
  }
  // @MessagePattern({cmd: 'Delete_Message_TCP'})
  @EventPattern('Delete_Message')
  @Delete('Delete_Message/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteNoTificationUseCaseProxy.getInstance().execute(id);
  }
  @EventPattern('Delete_Message_By_userId')
  @Delete('Delete_Message_By_userId/:id')
  async deleteUserById( id: number) {
    return await this.deleteNoTificationByUserUseCaseProxy.getInstance().execute(id);
  }
  @EventPattern('update_Message')
  @Put()
  async updateIsSeen(@Body('id') ids: number[]) {
    return await this.updateNoTificationUseCaseProxy.getInstance().execute(ids);
  }
}