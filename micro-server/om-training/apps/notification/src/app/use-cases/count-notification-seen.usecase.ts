import { INotificationService } from '../domain/services/notificationService.interface';

export class CountNotificationUseCases {
  constructor(private readonly notificationsService: INotificationService) {}

  async execute(id: number): Promise<any> {
    const result = await this.notificationsService.countMessageSeen(id);
    return result;
  }
}