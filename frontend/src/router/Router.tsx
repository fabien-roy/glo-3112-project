import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'router/RouteWithSubRoutes';
import { RouteProps } from 'router/Config';

interface IProps {
  routes: RouteProps[];
}

/* eslint-disable react/jsx-props-no-spreading */
export const Router: React.FC<IProps> = ({ routes }) => {
  return (
    <Switch>
      {routes?.map((route: RouteProps) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  );
};
