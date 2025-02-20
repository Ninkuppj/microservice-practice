import { Injectable } from '@nestjs/common';
import { NotificationDTO } from '@shared';
import { INotificationRepository } from '../../domain/repositories/notificationRepository.interface';
import { INotificationService } from '../../domain/services/notificationService.interface';

@Injectable()
export class NotificationService{
  constructor(
    private readonly notifiRepository: INotificationRepository,
  ) {}

  async create(notification : NotificationDTO): Promise<Notification> {
    return this.notifiRepository.create(notification);
  }

  async updateIsSeen(notifiIds : number[]): Promise<any> {
    return this.notifiRepository.updateIsSeen(notifiIds)
  }
  async findOne(id: number): Promise<Notification|null> {
    return this.notifiRepository.findOne(id);
  }
  async findMessageByUser (userId: number): Promise<any>{
    return this.notifiRepository.findMessageByUser(userId)
  }
  async findAll(): Promise<Notification[]> {
    return this.notifiRepository.findAll();
  }
  async countMessageSeen(userId:number): Promise<number> {
    return this.notifiRepository.countMessageSeen(userId);
  }

  async delete(id: number): Promise<void> {
    await this.notifiRepository.delete(id);
  }
  async deleteByUserId(id: number): Promise<void> {
    await this.notifiRepository.deleteByUserId(id);
  }
}
