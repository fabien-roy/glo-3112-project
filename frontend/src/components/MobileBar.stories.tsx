import React from 'react';
import useMemoryRouter from '../hooks/useMemoryRouter';
import { MobileBar } from './MobileBar';

export default {
  title: 'components/MobileBar',
  component: MobileBar,
};

const user = {
  name: 'TestUser',
  avatar: 'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
};

export const Basic = () => useMemoryRouter(<MobileBar loggedUser={user} />);
