import React from 'react';
import { Users } from './Users';
import wrapInMemoryRouter from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/users/Users',
  component: Users,
};

export const Basic = () => wrapInMemoryRouter(<Users />);
