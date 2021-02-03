import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRoute } from 'router/Config';

export const RouteWithSubRoutes = (route: IRoute) => {
  //   /** Authenticated flag */
  const authenticated = true;

  /*eslint-disable */
  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? <Redirect to={route.redirect}/> :
            route.private ? (
              authenticated ? route.component &&
                <route.component {...props} routes={route.routes}/> : <Redirect to='/'/>
            ) : route.component && <route.component {...props} routes={route.routes}/>
        }
      />
    </Suspense>
  );
  /* eslint-enable */
};
