import mongoose, { Document, Schema } from 'mongoose';
import { NotificationEvent } from '../types/notifications';

const NotificationsSchema: Schema = new Schema(
  {
    recipient: String,
    type: String,
    user: String,
    postId: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): NotificationEvent {
        return {
          type: ret.type,
          user: ret.user,
          postId: ret.postId,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

export const Notifications = mongoose.model<NotificationEvent & Document>(
  'Notifications',
  NotificationsSchema,
);
