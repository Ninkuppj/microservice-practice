import { INotificationService } from '../domain/services/notificationService.interface';

export class UpdateNotificationUseCases {
  constructor( private readonly notificationsService: INotificationService) {}

  async execute(id: number[]): Promise<void> {
    const result = await this.notificationsService.updateIsSeen(id);
    return result;
  }
}