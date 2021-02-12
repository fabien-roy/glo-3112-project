import React from 'react';
import { render } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import Box from '@material-ui/core/Box';
import UserInfo from './UserInfo';
import UserInfoHeader from './UserInfoHeader';
import UserInfoDescription from './UserInfoDescription';
import UserInfoStats from './UserInfoStats';

const fullname = 'Full Name';
const description = 'This is a description!';
const username = 'UserName';
const stats = {
  totalPost: 45,
  totalFollowers: 450,
  totalFollowing: 789,
};

describe('When rendering UserInfo', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  const wrapper = shallow(
    <UserInfo
      fullname={fullname}
      description={description}
      username={username}
      stats={stats}
    />
  );

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
