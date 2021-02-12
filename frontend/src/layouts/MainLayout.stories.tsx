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

export const Basic = () =>
  useMemoryRouter(
    <MainLayout>
      <></>
    </MainLayout>
  );

export const WithFeedView = () =>
  useMemoryRouter(
    <MainLayout>
      <Feed />
    </MainLayout>
  );

export const WithPostView = () =>
  useMemoryRouter(
    <MainLayout>
      <Post />
    </MainLayout>
  );

export const WithUsersView = () =>
  useMemoryRouter(
    <MainLayout>
      <Users />
    </MainLayout>
  );

export const WithUserView = () =>
  useMemoryRouter(
    <MainLayout>
      <User />
    </MainLayout>
  );
