import { Controller, Get, Route, SuccessResponse, Request } from 'tsoa';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationEvent } from '../types/notifications';
import { validateAuthentication } from './authorization';

@Route('notifications')
export class NotificationsController extends Controller {
  private notificationsRepository = new NotificationsRepository();

  @Get()
  @SuccessResponse('200, OK')
  public async getNotifications(
    @Request() req: any,
  ): Promise<NotificationEvent[]> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.notificationsRepository.getNotifications(req.user.username),
    ).then(
      (notifications: NotificationEvent[]) => {
        this.setStatus(200);
        return notifications;
      },
      (err) => {
        throw err;
      },
    );
  }
}
