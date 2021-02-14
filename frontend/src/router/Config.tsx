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
    component: lazy(() => import('views/posts/Feed')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/posts/:postId',
    component: lazy(() => import('views/posts/Post')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    // TODO : Remove this route
    path: '/users',
    component: lazy(() => import('views/users/Users')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
  {
    path: '/users/:username',
    component: lazy(() => import('views/users/User')),
    exact: true,
    private: false,
    fallback: Fallback,
  },
];
