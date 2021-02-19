import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { UserInfoHeader } from 'components/users/info/UserInfoHeader';
import { UserInfoDescription } from 'components/users/info/UserInfoDescription';
import { UserInfoStats } from 'components/users/info/UserInfoStats';
import { UserHeaderMobile } from './UserHeaderMobile';

const fullname = 'Full Name';
const description = 'This is a description!';
const username = 'UserName';

const stats = {
  totalPost: 45,
};

describe('When rendering UserHeaderMobile', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  const wrapper = mount(
    <UserHeaderMobile
      fullname={fullname}
      description={description}
      username={username}
      stats={stats}
    />
  );

  it('Should render UserAvatar component', () => {
    expect(
      wrapper.containsMatchingElement(<UserAvatar username={username} />)
    ).toBe(true);
  });

  it('Should render UserInfoHeader component', () => {
    expect(
      wrapper.containsMatchingElement(<UserInfoHeader username={username} />)
    ).toEqual(true);
  });

  it('Should render UserInfoDescription component', () => {
    expect(
      wrapper.containsMatchingElement(
        <UserInfoDescription fullname={fullname} description={description} />
      )
    ).toEqual(true);
  });

  it('Should render UserInfoStats component', () => {
    expect(
      wrapper.containsMatchingElement(<UserInfoStats stats={stats} />)
    ).toEqual(true);
  });
});
