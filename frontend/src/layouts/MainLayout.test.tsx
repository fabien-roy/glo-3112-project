import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import MainLayout from './MainLayout';

describe('When rendering MainLayout', () => {
  it('Should render', () => {
    render(
      wrapInMemoryRouter(
        <MainLayout>
          <></>
        </MainLayout>
      )
    );
  });

  it('Should display children component', () => {
    const componentText = 'componentText';

    const wrapper = render(
      wrapInMemoryRouter(
        <MainLayout>
          <p>{componentText}</p>
        </MainLayout>
      )
    );

    expect(wrapper.text()).to.contain(componentText);
  });
});
