import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserInfoStatsMobile } from './UserInfoStatsMobile';

const stats = {
  totalPost: 45,
  totalFollowers: 450,
  totalFollowing: 789,
};

describe('When rendering UserInfoStatsMobile', () => {
  const wrapper = mount(<UserInfoStatsMobile stats={stats} />);

  it('Should render Box', () => {
    render(<Box />);
  });

  // TODO: fix tests
  // it('Should render posts stat', () => {
  //   expect(wrapper.find('#userInfoStatsPosts').hostNodes().html()).toBe(
  //     '45'
  //   );
  //
  // });
  //
  // it('Should render followers stat', () => {
  //   expect(wrapper.find('#userInfoStatsFollowers').hostNodes().childAt(0).text()).toBe(
  //     '450'
  //   );
  // });
  //
  // it('Should render followed accounts stat', () => {
  //   expect(wrapper.find('#userInfoStatsFollowing').first().text()).toBe(
  //     '789 following'
  //   );
  // });
});
