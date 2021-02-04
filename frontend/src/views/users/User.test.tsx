import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';
import { expect } from 'chai';
import User from './User';

const username = 'username';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ username }),
}));

it('renders User', () => {
  render(
    <MemoryRouter>
      <User />
    </MemoryRouter>
  );
});

it('displays username', () => {
  const wrapper = render(
    <MemoryRouter>
      <User />
    </MemoryRouter>
  );

  expect(wrapper.text()).to.contain(username);
});
