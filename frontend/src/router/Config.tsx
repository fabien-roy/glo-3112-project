import { lazy } from 'react';
import { RouteProps } from './RouterProps';
import { Fallback } from './Fallback';

export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    redirect: '/posts',
    fallback: Fallback,
  },
  {
    path: '/posts',
    component: lazy(() => import('views/posts/FeedView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/posts/:postId',
    component: lazy(() => import('views/posts/PostView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/users/:username',
    component: lazy(() => import('views/users/UserView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/settings',
    component: lazy(() => import('views/settings/SettingsView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/search',
    component: lazy(() => import('views/SearchView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/search/description/:searchstring',
    component: lazy(() => import('views/posts/FeedView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/search/hashtag/:searchstring',
    component: lazy(() => import('views/posts/FeedView')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
];
