import { Injectable } from '@nestjs/common';
import { NotificationDTO } from '@shared';
import { INotificationRepository } from '../repositories/notificationRepository.interface';

@Injectable()
export abstract class INotificationService {
  async create(notification : NotificationDTO): Promise<Notification|any> {
  }
  async updateIsSeen(notifiIds : number[]): Promise<any> {
  }
  async findOne(id: number): Promise<Notification|any> {
  }
  async findMessageByUser (userId: number): Promise<any>{
  }
  async findAll(): Promise<Notification[]|any> {
  }
  async countMessageSeen(userId:number): Promise<number|any> {
  }
  async delete(id: number): Promise<void> {
  }
  async deleteByUserId(id: number): Promise<void> {
  }
}
