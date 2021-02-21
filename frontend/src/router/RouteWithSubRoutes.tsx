import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from './RouterProps';

export const RouteWithSubRoutes = (route: RouteProps) => {
  const render = (props) =>
    route.redirect ? (
      <Redirect to={route.redirect} />
    ) : (
      route.component && <route.component {...props} routes={route.children} />
    );

  return (
    <Suspense fallback={route.fallback}>
      <Route path={route.path} render={render} />
    </Suspense>
  );
};
