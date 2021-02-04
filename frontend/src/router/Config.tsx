import React, {
  ComponentType,
  lazy,
  LazyExoticComponent,
  ReactNode,
} from 'react';

export interface IRoute {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  exact: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: LazyExoticComponent<ComponentType<any>>;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
}

export const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    redirect: '/posts',
    fallback: <div> Loading... </div>,
  },
  {
    path: '/posts',
    component: lazy(() => import('views/posts/Feed')),
    exact: false,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: '/posts/:id',
    component: lazy(() => import('views/posts/Post')),
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: '/users',
    component: lazy(() => import('views/users/Users')),
    exact: false,
    private: false,
    fallback: <div> Loading... </div>,
    routes: [
      {
        path: '/users/:username',
        component: lazy(() => import('views/users/User')),
        exact: false,
        private: false,
        fallback: <div> Loading... </div>,
      },
    ],
  },
];
