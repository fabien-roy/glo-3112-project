import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'router/RouteWithSubRoutes';
import { PrivateRoute } from 'router/PrivateRoute';
import { RouteProps } from 'router/RouterProps';

export interface RouterProps {
  routes: RouteProps[];
  logged: boolean;
}

export const Router: React.FC<RouterProps> = ({ routes, logged }) => {
  return (
    <Switch>
      {routes?.map((route: RouteProps) => {
        return route.private ? (
          <PrivateRoute route={route} logged={logged} />
        ) : (
          <RouteWithSubRoutes key={route.path} {...route} />
        );
      })}
    </Switch>
  );
};

// <RouteWithSubRoutes key={route.path} route={route} logged={logged} />
