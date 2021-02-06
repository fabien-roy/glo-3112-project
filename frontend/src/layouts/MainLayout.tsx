import React, { ReactNode } from 'react';
import { Navigation } from '../components/Navigation';

interface ParamTypes {
  children: ReactNode;
}

export const MainLayout = ({ children }: ParamTypes) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default MainLayout;
