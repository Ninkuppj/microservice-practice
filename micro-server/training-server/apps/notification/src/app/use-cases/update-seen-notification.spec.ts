import { makeNotification } from '../../assets/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../assets/repositories/in-memory-notification-respository';
import { UpdateNotificationUseCases } from './update-seen-notification.usecase';
describe('Update Seen notification', () => {

  const notificationsRepository = new InMemoryNotificationsRepository();
  const updateNotification = new UpdateNotificationUseCases(notificationsRepository);

  it('should be able to update seen notification ', async () => {

    const notification = makeNotification();
    await notificationsRepository.create(notification)
    const countNotifi =await updateNotification.execute([notification.id]);
    expect(countNotifi).toEqual([{...notification, isSeen:false}]);
  });
  // it('should not be able to update seen notification', async () => {
  //   const notificationsRepository = new InMemoryNotificationsRepository();
  //   const updateNotification = new UpdateNotificationUseCases(notificationsRepository);

  //   const notification = makeNotification();

  //   const countNotifi = await updateNotification.execute(notification.user.id);
  //     expect(countNotifi).toEqual([]);
  // });
});