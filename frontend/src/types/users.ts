export interface User {
  username: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName?: string;
  description?: string;
  avatarReference?: string;
  notifiedAt: Date;
  createdAt: Date;
}

export interface SimpleUser {
  username: string;
  firstName: string;
  lastName?: string;
  avatarReference?: string;
}

export interface UserModificationParams {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatarData?: string;
  notifiedAt?: Date;
}

export interface UserQueryParams {
  username?: string;
}
