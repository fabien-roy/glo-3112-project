import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import useMemoryRouter from '../hooks/useMemoryRouter';
import MainLayout from './MainLayout';

describe('When rendering MainLayout', () => {
  it('Should render', () => {
    render(
      useMemoryRouter(
        <MainLayout>
          <></>
        </MainLayout>
      )
    );
  });

  it('Should display children component', () => {
    const componentText = 'componentText';

    const wrapper = render(
      useMemoryRouter(
        <MainLayout>
          <p>{componentText}</p>
        </MainLayout>
      )
    );

    expect(wrapper.text()).to.contain(componentText);
  });
});
