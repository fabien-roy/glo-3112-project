import React, { Suspense } from 'react';
import { RouteProps } from './RouterProps';
import { RouteWithSubRoutes } from './RouteWithSubRoutes';

export interface PrivateRouteProps {
  route: RouteProps;
  logged: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  route,
  logged,
}) => {
  const privateRoute = { ...route };
  if (route.private && !logged) {
    privateRoute.redirect = 'login';
  }

  return <RouteWithSubRoutes {...privateRoute} />;
};
