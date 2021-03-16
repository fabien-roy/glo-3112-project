import { lazy } from 'react';
import { RouteProps } from './RouterProps';
import { Fallback } from './Fallback';

export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    redirect: '/posts',
    private: true,
    fallback: Fallback,
  },
  {
    path: '/login',
    component: lazy(() => import('views/auth/LoginView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/posts',
    component: lazy(() => import('views/posts/FeedView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    path: '/posts/:postId',
    component: lazy(() => import('views/posts/PostView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    path: '/users/:username',
    component: lazy(() => import('views/users/UserView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    path: '/settings',
    component: lazy(() => import('views/settings/SettingsView')),
    exact: true,
    private: true,
    fallback: Fallback,
  },
  {
    path: '/search',
    component: lazy(() => import('views/search/SearchView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
];
