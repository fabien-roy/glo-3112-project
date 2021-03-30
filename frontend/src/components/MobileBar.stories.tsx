import React from 'react';
import { UserFactory } from 'factories/UserFactory';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { MobileBar } from './MobileBar';
import { NotificationEvent } from '../types/notifications';

const user = UserFactory.make();
const notifications: NotificationEvent[] = [
  {
    type: 'comment',
    user: 'test',
    postId: '6062629da4a5c000388ceb13',
    createdAt: new Date(Date.now()),
  },
];

export default {
  title: 'components/MobileBar',
  component: MobileBar,
};

export const WithLoggedUser = () =>
  wrapInMemoryRouter(
    <MobileBar
      loggedUser={user}
      notifications={notifications}
      showActivity={null}
    />
  );

export const WithoutLoggedUser = () =>
  wrapInMemoryRouter(
    <MobileBar notifications={notifications} showActivity={null} />
  );
