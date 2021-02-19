import React from 'react';
import { UserFactory } from 'factories/UserFactory';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { MobileBar } from './MobileBar';

const user = UserFactory.make();

export default {
  title: 'components/MobileBar',
  component: MobileBar,
};

export const Basic = () => wrapInMemoryRouter(<MobileBar loggedUser={user} />);
