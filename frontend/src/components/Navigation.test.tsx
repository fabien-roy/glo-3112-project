import React from 'react';
import { render } from '@testing-library/react';
import expect from 'expect';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { User } from 'types/users';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import { UserAvatar } from './users/UserAvatar';

const user = {
  username: 'TestUser',
  email: '',
  phoneNumber: '',
  firstName: 'Test',
  lastName: 'User',
  description: '',
  avatarReference:
    'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
};

const users: User[] = [];

describe('When rendering Navigation', () => {
  it('Should render', () => {
    render(
      wrapInMemoryRouter(
        <Navigation users={users} loggedUser={user} isLoading={false} />
      )
    );
  });

  let layout: any;
  beforeEach(() => {
    layout = shallow(
      <Navigation users={users} loggedUser={user} isLoading={false} />
    );
  });

  it('Should contain Ugram brand', () => {
    expect(layout.contains('Ugram')).toEqual(true);
  });

  it('Should render all components', () => {
    expect(layout.find(SearchBar)).toHaveLength(1);
    expect(layout.find(IconButton)).toHaveLength(3);
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });

  it('Should contain 3 router links', () => {
    expect(layout.find(Link)).toHaveLength(3);
  });
});
