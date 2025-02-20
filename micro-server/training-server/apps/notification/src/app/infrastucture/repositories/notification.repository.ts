import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationDTO } from '@shared';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { INotificationRepository } from '../../domain/repositories/notificationRepository.interface';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(notification : NotificationDTO): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }
  async updateIsSeen(notifiIds : number[]): Promise<any> {
    return this.notificationRepository.createQueryBuilder().update(Notification).set({isSeen:false}).whereInIds(notifiIds).execute();
  }
  async findOne(id: number): Promise<Notification|null> {
    return this.notificationRepository.findOne({where:{id:id}});
  }
  async findMessageByUser (userId: number): Promise<any>{
    return this.notificationRepository.find({where:{ user: { id: userId }}})
  }
  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }
  async countMessageSeen(userId:number): Promise<number> {
    return this.notificationRepository.count({
        where:{
          isSeen:true,
          user:{
            id:userId
          }
        }
    });
  }

  async delete(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
  async deleteByUserId(id: number): Promise<void> {
    await this.notificationRepository.delete({user: {id:id}});
  }
}
