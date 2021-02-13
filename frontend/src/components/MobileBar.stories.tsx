import React from 'react';
import useMemoryRouter from '../hooks/useMemoryRouter';
import { MobileBar } from './MobileBar';

export default {
  title: 'components/MobileBar',
  component: MobileBar,
};
// TODO linker comme il faut les users avec #107
const user = {
  userName: 'TestUser',
  email: '',
  phoneNumber: '',
  firstName: 'Test',
  lastName: 'User',
  description: '',
  avatarReference:
    'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
};

export const Basic = () => useMemoryRouter(<MobileBar loggedUser={user} />);
