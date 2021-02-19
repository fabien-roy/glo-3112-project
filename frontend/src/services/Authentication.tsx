import { User } from 'types/users';

export function getLoggedUser() {
  const user: User = {
    username: 'TestUser',
    email: '',
    phoneNumber: '',
    firstName: 'Test',
    lastName: 'User',
    description: '',
    avatarReference:
      'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
  };
  return user;
}
