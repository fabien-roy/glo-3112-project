import React from 'react';
import { render } from '@testing-library/react';
import expect from 'expect';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { User } from 'types/users';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { UserFactory } from 'factories/UserFactory';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import { UserAvatar } from './users/avatar/UserAvatar';

const loggedUser = UserFactory.make();
const users: User[] = UserFactory.make(3);

describe('When rendering Navigation', () => {
  it('Should render', () => {
    render(
      wrapInMemoryRouter(
        <Navigation users={users} loggedUser={loggedUser} isLoading={false} />
      )
    );
  });

  let layout: any;
  beforeEach(() => {
    layout = shallow(
      <Navigation users={users} loggedUser={loggedUser} isLoading={false} />
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

  it('Should contain 4 router links', () => {
    expect(layout.find(Link)).toHaveLength(4);
  });
});
