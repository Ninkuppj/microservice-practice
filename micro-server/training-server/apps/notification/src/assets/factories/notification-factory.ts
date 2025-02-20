
import { INotification, Notification, NotificationDTO } from '@shared';

type Override = Partial<INotification>;

export function makeNotification(override: Override = {}) {
  return {
    id:12,
    desc: 'test notification',
    isSeen: true,
    title:'test notification',
    user:{id:107},
    ...override,
  } as any;
}