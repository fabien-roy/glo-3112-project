import React from 'react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { FeedView } from 'views/posts/FeedView';
import { PostView } from 'views/posts/PostView';
import { UserView } from 'views/users/UserView';
import { SearchView } from 'views/search/SearchView';
import { MainLayout } from './MainLayout';
import { NotificationEvent } from '../types/notifications';

const notifications: NotificationEvent[] = [];

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,
};

export const Basic = () =>
  wrapInMemoryRouter(
    <MainLayout notifications={notifications}>
      <></>
    </MainLayout>
  );

export const WithFeedView = () =>
  wrapInMemoryRouter(
    <MainLayout notifications={notifications}>
      <FeedView />
    </MainLayout>
  );

export const WithPostView = () =>
  wrapInMemoryRouter(
    <MainLayout notifications={notifications}>
      <PostView />
    </MainLayout>
  );

export const WithUserView = () =>
  wrapInMemoryRouter(
    <MainLayout notifications={notifications}>
      <UserView />
    </MainLayout>
  );

export const WithSearchView = () =>
  wrapInMemoryRouter(
    <MainLayout notifications={notifications}>
      <SearchView />
    </MainLayout>
  );
