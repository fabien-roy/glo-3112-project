import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'router/RouteWithSubRoutes';
import { IRoute } from 'router/Config';

interface IProps {
  routes: IRoute[];
}

export const Router: React.FC<IProps> = ({ routes }) => {
  return (
    <Switch>
      {routes &&
        routes.map((route: IRoute) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
    </Switch>
  );
};
