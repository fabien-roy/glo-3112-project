import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MobileBar } from './MobileBar';

describe('When rendering MobileBar', () => {
  it('Should render', () => {
    render(<MobileBar loggedUser="Toto" routeChange={routeChange} />);
  });
});

const routeChange = (route: string) => {
  const history = createMemoryHistory();
  history.push(route);
};
