import React from 'react';
import { MainLayout } from './MainLayout';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import FeedView from '../views/posts/FeedView';
import PostView from '../views/posts/PostView';
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
      <FeedView />
    </MainLayout>
  );

export const WithPostView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <PostView />
    </MainLayout>
  );

export const WithUserView = () =>
  wrapInMemoryRouter(
    <MainLayout>
      <UserView />
    </MainLayout>
  );
