import { User } from 'types/users';

let loggedUser: User = {
  username: 'TestUser',
  email: '',
  phoneNumber: '',
  firstName: 'Test',
  lastName: 'User',
  description: '',
  avatarReference: '',
};

export function setLoggedUser(user: User) {
  loggedUser = user;
}

export function getLoggedUser() {
  return loggedUser;
}
