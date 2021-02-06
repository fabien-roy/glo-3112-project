import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const wrapInMemoryRouter = (children: any): any => (
  <MemoryRouter>{children}</MemoryRouter>
);

export default wrapInMemoryRouter;
