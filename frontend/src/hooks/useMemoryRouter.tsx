import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const useMemoryRouter = (children: any): any => (
  <MemoryRouter>{children}</MemoryRouter>
);

export default useMemoryRouter;
