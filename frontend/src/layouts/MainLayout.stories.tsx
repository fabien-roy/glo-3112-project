import React from 'react';
import { MainLayout } from './MainLayout';
import useMemoryRouter from '../hooks/useMemoryRouter';
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
  <MainLayout>{useMemoryRouter(<Feed />)}</MainLayout>
);

export const WithPostView = () => (
  <MainLayout>{useMemoryRouter(<Post />)}</MainLayout>
);

export const WithUsersView = () => (
  <MainLayout>{useMemoryRouter(<Users />)}</MainLayout>
);

export const WithUserView = () => (
  <MainLayout>{useMemoryRouter(<User />)}</MainLayout>
);
