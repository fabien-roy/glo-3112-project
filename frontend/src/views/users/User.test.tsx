import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import User from './User';

const username = 'username';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ username }),
}));

describe('When rendering User', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<User />));
  });

  it('Should display username', () => {
    const wrapper = render(wrapInMemoryRouter(<User />));

    expect(wrapper.text()).to.contain(username);
  });
});
