export interface User {
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  description?: string;
  avatarReference?: string;
}

export interface UserCreationParams {
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface UserModificationParams {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatarReference?: string;
}

// TODO : Rename to UserModificationParams and use this one
export interface UploadUserModificationParams {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatarData?: string;
  avatarReference?: string;
}
