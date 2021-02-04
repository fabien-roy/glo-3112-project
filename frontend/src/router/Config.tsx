import React, {
  ComponentType,
  lazy,
  LazyExoticComponent,
  ReactNode,
} from 'react';

// TODO : Move to d.ts file
export interface RouteProps {
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  children?: RouteProps[];
  redirect?: string;
  private?: boolean;
}

// TODO : Have fallback be a component
export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    redirect: '/posts',
    fallback: <div> Loading... </div>,
  },
  {
    path: '/posts',
    component: lazy(() => import('views/posts/Feed')),
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: '/posts/:postId',
    component: lazy(() => import('views/posts/Post')), // TODO : Pass postId
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: '/users',
    component: lazy(() => import('views/users/Users')),
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: '/users/:username',
    component: lazy(() => import('views/users/User')), // TODO : Pass username
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
];
