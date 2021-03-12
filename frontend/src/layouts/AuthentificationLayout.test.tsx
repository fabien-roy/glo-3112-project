import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import AuthentificationLayout from './AuthentificationLayout';

describe('When rendering MainLayout', () => {
  it('Should render', () => {
    render(
      wrapInMemoryRouter(
        <AuthentificationLayout>
          <></>
        </AuthentificationLayout>
      )
    );
  });

  it('Should display children component', () => {
    const componentText = 'componentText';

    const wrapper = render(
      wrapInMemoryRouter(
        <AuthentificationLayout>
          <p>{componentText}</p>
        </AuthentificationLayout>
      )
    );

    expect(wrapper.text()).to.contain(componentText);
  });
});
