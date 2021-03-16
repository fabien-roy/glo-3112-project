import { lazy } from 'react';
import { RouteProps } from './RouterProps';
import { Fallback } from './Fallback';

export const routes: RouteProps[] = [
  {
    key: 'root',
    path: '/',
    exact: true,
    redirect: '/posts',
    private: true,
    fallback: Fallback,
  },
  {
    key: 'login',
    path: '/login',
    component: lazy(() => import('views/auth/LoginView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    key: 'feed',
    path: '/posts',
    component: lazy(() => import('views/posts/FeedView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    key: 'post',
    path: '/posts/:postId',
    component: lazy(() => import('views/posts/PostView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    key: 'user',
    path: '/users/:username',
    component: lazy(() => import('views/users/UserView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    key: 'settings',
    path: '/settings',
    component: lazy(() => import('views/settings/SettingsView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    key: 'search',
    path: '/search',
    component: lazy(() => import('views/search/SearchView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
];
