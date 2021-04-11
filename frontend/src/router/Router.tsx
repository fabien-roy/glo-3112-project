import React from 'react';
import ReactGA from 'react-ga';
import { Switch, useHistory } from 'react-router-dom';
import { RouteWithSubRoutes } from 'router/RouteWithSubRoutes';
import { PrivateRoute } from 'router/PrivateRoute';
import { RouteProps } from 'router/RouterProps';

export interface RouterProps {
  routes: RouteProps[];
}

export const Router: React.FC<RouterProps> = ({ routes }) => {
  const history = useHistory();

  history.listen((update: any) => {
    ReactGA.set({ page: update.pathname });
    ReactGA.pageview(`${update.pathname}${update.search}`);
  });

  return (
    <Switch>
      {routes?.map((route: RouteProps) => {
        return route.private ? (
          <PrivateRoute {...route} />
        ) : (
          <RouteWithSubRoutes key={route.path} {...route} />
        );
      })}
    </Switch>
  );
};
