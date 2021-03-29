import { NotificationEvent } from '../types/notifications';
import { Notifications } from '../models/notifications.model';
import { subscribers } from '../middlewares/events';
import { logger } from '../middlewares/logger';

export class NotificationsRepository {
  public async getNotifications(
    recipient: string,
  ): Promise<NotificationEvent[]> {
    return (
      await Notifications.find({ recipient }).sort({
        createdAt: 'desc',
      })
    ).map((notification) => notification.toJSON());
  }

  public async createNotification(
    recipient: string,
    type: string,
    user: string,
    postId: string,
  ) {
    const notification = (
      await Notifications.create({ recipient, type, user, postId })
    ).toJSON();

    this.notify(recipient, notification);
  }

  private notify(recipient: string, message: NotificationEvent) {
    subscribers.forEach((subscriber: any) => {
      if (subscriber.username === recipient) {
        logger.info(`Notifying post owner ${recipient}`);
        subscriber.response.write(`data: ${JSON.stringify(message)}\n\n`);
        return;
      }
    });
  }
}
