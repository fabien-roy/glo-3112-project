import { ComponentType, LazyExoticComponent, ReactNode } from 'react';

export interface RouteProps {
  key: string;
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  children?: RouteProps[];
  redirect?: string;
  private?: boolean;
}
