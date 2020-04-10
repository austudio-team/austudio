import Notification from 'rc-notification';
import { NotificationInstance } from 'rc-notification/lib/Notification';

let notification: NotificationInstance | null = null;
export const getNotification = () => {
  return new Promise<NotificationInstance>(resolve => {
    if (notification) {
      resolve(notification);
      return;
    }
    Notification.newInstance({}, n => {
      notification = n;
      resolve(n);
    });
  });
}
