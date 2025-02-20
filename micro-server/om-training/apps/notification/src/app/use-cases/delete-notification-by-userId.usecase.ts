import { INotificationRepository } from '../domain/repositories/notificationRepository.interface';
import { INotificationService } from '../domain/services/notificationService.interface';

export class DeleteNotificationByUserUseCases {
  constructor(private readonly notificationsService: INotificationService) {}

  async execute(id: number): Promise<void> {
    const result = await this.notificationsService.deleteByUserId(id);
    return result;
  }
}