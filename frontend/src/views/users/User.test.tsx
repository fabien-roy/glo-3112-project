import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import useMemoryRouter from '../../hooks/useMemoryRouter';
import User from './User';

const username = 'username';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ username }),
}));

describe('When rendering User', () => {
  it('Should render', () => {
    render(useMemoryRouter(<User />));
  });

  it('Should display username', () => {
    const wrapper = render(useMemoryRouter(<User />));

    expect(wrapper.text()).to.contain(username);
  });
});
