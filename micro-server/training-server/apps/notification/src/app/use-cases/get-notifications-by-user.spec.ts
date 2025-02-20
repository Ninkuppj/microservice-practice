import { makeNotification } from '../../assets/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../assets/repositories/in-memory-notification-respository';
import { GetNotificationByUserUseCases } from './get-notifications-by-user.usecase';
describe('Delete notification by userId', () => {

  const notificationsRepository = new InMemoryNotificationsRepository();
  const getNotification = new GetNotificationByUserUseCases(notificationsRepository);

  it('should be able to get notification by userId', async () => {

    const notification = makeNotification();
    await notificationsRepository.create(notification)
    const countNotifi =await getNotification.execute(notification.user.id);
    expect(countNotifi).toEqual([notification]);
  });
  it('should not be able to get notification by non-existing userId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getNotification = new GetNotificationByUserUseCases(notificationsRepository);

    const notification = makeNotification();

    const countNotifi = await getNotification.execute(notification.user.id);
      expect(countNotifi).toEqual([]);
  });
});