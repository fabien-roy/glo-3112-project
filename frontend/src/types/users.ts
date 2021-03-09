export interface UserQueryParams {
  username?: string;
}

export interface User {
  username: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  description?: string;
  avatarReference?: string;
  createdAt: Date;
}

export interface UserModificationParams {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatarReference?: string;
}
