import { lazy } from 'react';
import { RouteProps } from './RouterProps';

export const routes: RouteProps[] = [
  {
    key: 'root',
    path: '/',
    exact: true,
    redirect: '/posts',
    private: true,
  },
  {
    key: 'login',
    path: '/login',
    component: lazy(() => import('views/auth/LoginView')),
    exact: true,
    private: false,
  },
  {
    key: 'feed',
    path: '/posts',
    component: lazy(() => import('views/posts/FeedView')),
    exact: true,
    private: true,
  },
  {
    key: 'post',
    path: '/posts/:postId',
    component: lazy(() => import('views/posts/PostView')),
    exact: true,
    private: true,
  },
  {
    key: 'user',
    path: '/users/:username',
    component: lazy(() => import('views/users/UserView')),
    exact: true,
    private: true,
  },
  {
    key: 'settings',
    path: '/settings',
    component: lazy(() => import('views/settings/SettingsView')),
    exact: true,
    private: true,
  },
  {
    key: 'search',
    path: '/search',
    component: lazy(() => import('views/search/SearchView')),
    exact: true,
    private: true,
  },
];
