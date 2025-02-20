import { makeNotification } from '../../assets/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../assets/repositories/in-memory-notification-respository';
import { DeleteNotificationByUserUseCases } from './delete-notification-by-userId.usecase';
describe('Delete notification by userId', () => {

  const notificationsRepository = new InMemoryNotificationsRepository();
  const delNotification = new DeleteNotificationByUserUseCases(notificationsRepository);

  it('should be able to delete notification by userId', async () => {

    const notification = makeNotification();
    await notificationsRepository.create(notification)
    const countNotifi =await delNotification.execute(notification.user.id);
    expect(countNotifi).toEqual(0);
  });
  // it('should not be able to delete non-existing notification', async () => {
  //   const notificationsRepository = new InMemoryNotificationsRepository();
  //   const delNotification = new DeleteNotificationUseCases(notificationsRepository);

  //   const notification = makeNotification();

  //   const countNotifi = await delNotification.execute(notification.id);
  //     expect(countNotifi).toEqual(0);
  // });
});