import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'router/RouteWithSubRoutes';
import { RouteProps } from 'router/RouterProps';

interface RouterProps {
  routes: RouteProps[];
}

export const Router: React.FC<RouterProps> = ({ routes }) => {
  return (
    <Switch>
      {routes?.map((route: RouteProps) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  );
};