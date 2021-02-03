import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRoute } from 'router/Config';
// import { user } from '../index';

export const RouteWithSubRoutes = (route: IRoute) => {
  //   /** Authenticated flag */
  //   const authenticated: boolean = user.authenticated;
  const authenticated: boolean = true;

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            authenticated ? (
              route.component && (
                <route.component {...props} routes={route.routes} /> : <Redirect to='/' /> // Will have to redirect to Login at some point
            )
          ) : (
            route.component && (
              <route.component {...props} routes={route.routes} />
            )
          )
        }
      />
    </Suspense>
  );
};
