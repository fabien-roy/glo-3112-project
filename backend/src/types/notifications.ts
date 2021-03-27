export interface NotificationEvent {
  type: string;
  user: string;
  postId: string;
}

export interface Subscriber {
  username: string;
  response: any;
}
