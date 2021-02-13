import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
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
});
