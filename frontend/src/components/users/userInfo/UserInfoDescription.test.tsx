import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import UserInfoDescription from './UserInfoDescription';

const fullname = 'Full Name';
const description = 'This is a description!';

describe('When rendering UserInfoDescription', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should render passed fullname and description', () => {
    const wrapper = mount(
      <UserInfoDescription fullname={fullname} description={description} />
    );

    expect(
      wrapper.containsMatchingElement(
        <Box>
          <div>
            <b>{fullname}</b>
          </div>
          <div>{description}</div>
        </Box>
      )
    ).toEqual(true);
  });
});
