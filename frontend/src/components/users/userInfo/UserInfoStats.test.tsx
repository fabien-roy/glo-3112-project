import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import UserInfoStats from './UserInfoStats';

const stats = {
  totalPost: 45,
  totalFollowers: 450,
  totalFollowing: 789,
};

describe('When rendering UserInfoStats', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should add margin to Box', () => {
    const wrapper = mount(<UserInfoStats stats={stats} />);

    expect(
      wrapper.find('#userInfoStats').hostNodes().hasClass('MuiBox-root-2')
    ).toBe(true);
  });

  it('Should render posts stat', () => {
    const wrapper = mount(<UserInfoStats stats={stats} />);

    expect(wrapper.find('#userInfoStatsPosts').hostNodes().text()).toBe(
      '45 posts'
    );
  });

  it('Should render followers stat', () => {
    const wrapper = mount(<UserInfoStats stats={stats} />);

    expect(wrapper.find('#userInfoStatsFollowers').hostNodes().text()).toBe(
      '450 followers'
    );
  });

  it('Should render followed accounts stat', () => {
    const wrapper = mount(<UserInfoStats stats={stats} />);

    expect(wrapper.find('#userInfoStatsFollowing').hostNodes().text()).toBe(
      '789 following'
    );
  });
});
