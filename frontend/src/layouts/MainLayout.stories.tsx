import React from 'react';
import { MainLayout } from './MainLayout';
import wrapInMemoryRouter from '../util/wrapInMemoryRouter';
import Feed from '../views/posts/Feed';
import Post from '../views/posts/Post';
import Users from '../views/users/Users';
import User from '../views/users/User';

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,
};

export const Basic = () => (
  <MainLayout>
    <></>
  </MainLayout>
);

export const WithFeedView = () => (
  <MainLayout>{wrapInMemoryRouter(<Feed />)}</MainLayout>
);

export const WithPostView = () => (
  <MainLayout>{wrapInMemoryRouter(<Post />)}</MainLayout>
);

export const WithUsersView = () => (
  <MainLayout>{wrapInMemoryRouter(<Users />)}</MainLayout>
);

export const WithUserView = () => (
  <MainLayout>{wrapInMemoryRouter(<User />)}</MainLayout>
);
