import { NotificationDTO } from '@shared';
import { INotificationService } from '../domain/services/notificationService.interface';
import { INotificationRepository } from '../domain/repositories/notificationRepository.interface';

export class AddNotificationUseCases {
  constructor(private readonly notificationsService: INotificationService) {}

  async execute(notification: NotificationDTO): Promise<Notification> {
    const result = await this.notificationsService.create(notification);
    return result;
  }
}