import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import AlertMessage from './AlertMessage';

describe('When rendering AlertMessage', () => {
  it('Should show a valid material card when valid props are passed', () => {
    const wrapper = mount(
      <AlertMessage
        severity="error"
        title="Error 999"
        description="This is a critical error!"
      />
    );

    expect(wrapper.contains('This is a critical error!')).toBeTruthy();
    expect(wrapper.contains('Error 999')).toBeTruthy();
    expect(wrapper.contains('Error 998')).toBeFalsy();
  });

  it('Should render', () => {
    render(
      <AlertMessage
        severity="error"
        title="Error 999"
        description="This is a critical error!"
      />
    );
  });
});
