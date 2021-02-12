import React from 'react';
import { render } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import Box from '@material-ui/core/Box';
import UserInfoHeader from './UserInfoHeader';

describe('When rendering UserInfoHeader', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should render passed username', () => {
    const wrapper = shallow(<UserInfoHeader username="username" />);

    expect(
      wrapper.containsMatchingElement(
        <Box>
          <span>username</span>
        </Box>
      )
    ).toEqual(true);
  });

  it('Should set Box fontSize default value', () => {
    const wrapper = mount(<UserInfoHeader username="username" />);

    expect(
      wrapper.find('.MuiBox-root').hasClass('makeStyles-headerFontSize-2')
    ).toBe(true);
  });

  it('Should add margin to Box', () => {
    const wrapper = mount(<UserInfoHeader username="username" />);

    expect(wrapper.find('.MuiBox-root').hasClass('MuiBox-root-4')).toBe(true);
  });
});
