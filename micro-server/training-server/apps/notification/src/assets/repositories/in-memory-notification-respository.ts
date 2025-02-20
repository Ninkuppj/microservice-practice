import { Notification, NotificationDTO } from '@shared';
import { INotificationRepository } from '../../app/domain/repositories/notificationRepository.interface';

export class InMemoryNotificationsRepository
  extends INotificationRepository
{
  notifications: any[] = [];

  async findOne(id: number): Promise<Notification|null> {
    const notification = this.notifications.find(
      (item) => item.id === id,
    );
    return notification ?? null;
  }
  async findMessageByUser(id: number): Promise<Notification[]|null> {
    const notifications = this.notifications.filter(
      (item) => item.user.id === id,
    );
    return notifications ?? null;
  }

  async create(notification : NotificationDTO) {
    this.notifications.push(notification);
  }
  async update(notification: Notification): Promise<void> {
    this.notifications = this.notifications.map(
      (item) =>{ 
        if(item.id === notification.id){
            item= notification;
      }}
    );
  }
  async updateIsSeen(notifiIds : number[]): Promise<any> {
    this.notifications.map(
        (item) =>{ 
          notifiIds.forEach((el)=> {
            if(item.id === el){
                item.isSeen = false;
          }})
          });
       return this.notifications;
          
  }

  async countMessageSeen(userId:number): Promise<number> {
    return this.notifications.filter(
      (notification:any) => notification.user.id === userId,
    ).length;
  }

  async delete(id: number): Promise<any>{

    return this.notifications.filter(
      (notification) => notification.id !== id,
    ).length;
  }

  async deleteByUserId(id: number): Promise<any> {

    return  this.notifications.filter(
      (notification) => notification.user.id !== id,
    ).length;
  }

}