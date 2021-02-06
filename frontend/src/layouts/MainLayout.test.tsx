import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import MainLayout from './MainLayout';

describe('When rendering MainLayout', () => {
  it('Should render', () => {
    render(
      <MainLayout>
        <></>
      </MainLayout>
    );
  });

  it('Should display children component', () => {
    const componentText = 'componentText';

    const wrapper = render(
      <MainLayout>
        <p>{componentText}</p>
      </MainLayout>
    );

    expect(wrapper.text()).to.contain(componentText);
  });
});
