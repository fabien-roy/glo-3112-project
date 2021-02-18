import React from 'react';
import { MainLayout } from './MainLayout';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import Feed from '../views/posts/Feed';
import PostView from '../views/posts/PostView';
import Users from '../views/users/Users';
import User from '../views/users/User';

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
      <PostView />
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
      <User />
    </MainLayout>
  );
