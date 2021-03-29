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

export interface UserCreationParams {
  username: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
}

export interface UserModificationParams {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatarData?: string;
  avatarReference?: string;
  notifiedAt?: Date;
}
