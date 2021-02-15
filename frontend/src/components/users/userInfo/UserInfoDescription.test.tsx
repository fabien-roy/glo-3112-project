import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserInfoDescription } from './UserInfoDescription';

const fullname = 'full name';
const description = 'This is a description!';

describe('When rendering UserInfoDescription', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should render passed fullname', () => {
    const wrapper = mount(
      <UserInfoDescription fullname={fullname} description={description} />
    );

    expect(wrapper.find('#UserInfoDescriptionFullName').text()).toBe(fullname);
  });

  it('Should render passed description', () => {
    const wrapper = mount(
      <UserInfoDescription fullname={fullname} description={description} />
    );

    expect(wrapper.find('#UserInfoDescriptionDescription').text()).toBe(
      description
    );
  });
});
