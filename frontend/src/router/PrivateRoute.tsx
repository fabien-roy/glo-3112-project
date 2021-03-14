import React, { useContext, useEffect } from 'react';
import { UserContext } from 'context/userContext';
import { RouteProps } from './RouterProps';
import { RouteWithSubRoutes } from './RouteWithSubRoutes';

export const PrivateRoute = (route: RouteProps) => {
  const { currentUser, loading } = useContext(UserContext);

  const privateRoute = { ...route };
  if (route.private && !currentUser && !loading) {
    privateRoute.redirect = '/login';
  }

  return <RouteWithSubRoutes {...route} />;
};
