import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// TODO : Export default
export const wrapInMemoryRouter = (children: any): any => (
  <MemoryRouter>{children}</MemoryRouter>
);
