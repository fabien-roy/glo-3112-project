import React from 'react';
import { MainLayout } from './MainLayout';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import Feed from '../views/posts/Feed';
import Post from '../views/posts/Post';
import Users from '../views/users/Users';
import UserView from '../views/users/UserView';

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,
};

export const Basic = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <></>
    </MainLayout>
  );

export const WithFeedView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <Feed />
    </MainLayout>
  );

export const WithPostView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <Post />
    </MainLayout>
  );

export const WithUsersView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <Users />
    </MainLayout>
  );

export const WithUserView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <UserView />
    </MainLayout>
  );
