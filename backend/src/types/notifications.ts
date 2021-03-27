export interface NotificationEvent {
  type: string;
  user: string;
  postId: string;
  createdAt: Date;
}

export interface Subscriber {
  username: string;
  response: any;
}
