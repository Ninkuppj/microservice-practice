import { makeNotification } from '../../assets/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../assets/repositories/in-memory-notification-respository';
import { CountNotificationUseCases } from './count-notification-seen.usecase';
describe('Count notification', () => {

  const notificationsRepository = new InMemoryNotificationsRepository();
  const countNotification = new CountNotificationUseCases(notificationsRepository);

  it('should be able to count notification', async () => {

    const notification = makeNotification();
    await notificationsRepository.create(notification)
    const countNotifi = await countNotification.execute(notification.user.id);
    expect(countNotifi).toEqual(1);
  });
  it('should not be able to count non-existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countNotification = new CountNotificationUseCases(notificationsRepository);

    const notification = makeNotification();

    const countNotifi = await countNotification.execute(notification.user.id);

      expect(countNotifi).toEqual(0);
  });
});