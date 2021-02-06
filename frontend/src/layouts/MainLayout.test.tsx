import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import MainLayout from './MainLayout';

it('renders MainLayout', () => {
  render(
    <MainLayout>
      <></>
    </MainLayout>
  );
});

it('displays children component', () => {
  const componentText = 'componentText';

  const wrapper = render(
    <MainLayout>
      <p>{componentText}</p>
    </MainLayout>
  );

  expect(wrapper.text()).to.contain(componentText);
});
