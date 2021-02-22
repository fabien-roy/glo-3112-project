import React from 'react';
import { UserFactory } from 'factories/UserFactory';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { MobileBar } from './MobileBar';

const user = UserFactory.make();

export default {
  title: 'components/MobileBar',
  component: MobileBar,
};

export const WithLoggedUser = () =>
  wrapInMemoryRouter(<MobileBar loggedUser={user} />);

export const WithoutLoggedUser = () => wrapInMemoryRouter(<MobileBar />);
