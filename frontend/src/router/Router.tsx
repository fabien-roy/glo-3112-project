import React, { useContext } from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'router/RouteWithSubRoutes';
import { PrivateRoute } from 'router/PrivateRoute';
import { RouteProps } from 'router/RouterProps';

export interface RouterProps {
  routes: RouteProps[];
}

export const Router: React.FC<RouterProps> = ({ routes }) => {
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
