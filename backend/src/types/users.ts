// TODO : Move to be used both by frontend and backend

export interface User {
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  description?: string;
  avatarReference?: string;
}

export interface UserCreationRequest {
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}
