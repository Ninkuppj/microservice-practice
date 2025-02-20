import { INotificationRepository } from '../domain/repositories/notificationRepository.interface';
import { INotificationService } from '../domain/services/notificationService.interface';

export class GetNotificationByUserUseCases {
  constructor(private readonly notificationsService: INotificationService) {}

  async execute(id: number): Promise<any> {
    const result = await this.notificationsService.findMessageByUser(id);
    return result;
  }
}