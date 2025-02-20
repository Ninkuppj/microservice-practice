import { INotificationService } from '../domain/services/notificationService.interface';
import { InMemoryNotificationsRepository } from '../../assets/repositories/in-memory-notification-respository';
import { makeNotification } from '../../assets/factories/notification-factory';
import { AddNotificationUseCases } from './create-notification.usecase'
describe('Create notification', () => {

  const notificationsRepository = new InMemoryNotificationsRepository();
  const createNotification = new AddNotificationUseCases(notificationsRepository);

  it('should be able to create a notification', async () => {

    const notification = makeNotification();
    await notificationsRepository.create(notification)
    const createNotifi = await createNotification.execute(notification);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
  // it('should not be able to create a notification', async () => {
  //   const notificationsRepository = new InMemoryNotificationsRepository();
  //   const createNotification = new AddNotificationUseCases(notificationsRepository);

  //   const notification = makeNotification();
  //     expect(notificationsRepository.notifications.length).toEqual(0);
  // });
});