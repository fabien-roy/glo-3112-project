import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { GoogleIcon } from 'assets/Icons/CustomIcons/GoogleIcon';
import { LoginView } from './LoginView';

describe('When rendering LoginView', () => {
  it('Should render OAuth login button', () => {
    const wrapper = mount(<LoginView />);

    expect(wrapper.find('#OAuthLoginButton').first().text()).toBe(
      'Log in with Google'
    );

    expect(wrapper.containsMatchingElement(<GoogleIcon />));

    expect(wrapper.find('#OAuthLoginButton').prop('href')).toBe(
      `${process.env.REACT_APP_BACKEND_URL}/auth/google`
    );
  });

  it('Should render Ugram text', () => {
    const wrapper = mount(<LoginView />);

    expect(wrapper.find('.MuiTypography-root').text()).toBe('UGram');
  });

  it('Should render LoginView', () => {
    render(<LoginView />);
  });
});
