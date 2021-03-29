import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { UserFactory } from 'factories/UserFactory';
import { Navigation } from './Navigation';
import { SearchBar } from './search/SearchBar';
import { UserAvatar } from './users/avatar/UserAvatar';
import { NotificationEvent } from '../types/notifications';

const loggedUser = UserFactory.make();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useLocation: () => ({
    pathname: '/',
  }),
}));

const notifications: NotificationEvent[] = [];

describe('When rendering Navigation', () => {
  let layout: any;
  beforeEach(() => {
    layout = shallow(
      <Navigation loggedUser={loggedUser} notifications={notifications} />
    );
  });

  it('Should contain Ugram brand', () => {
    expect(layout.contains('UGram')).toEqual(true);
  });

  it('Should render all components', () => {
    expect(layout.find(SearchBar)).toHaveLength(1);
    expect(layout.find(IconButton)).toHaveLength(4);
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });
});
