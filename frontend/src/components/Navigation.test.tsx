import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { User } from 'types/users';
import { Post } from 'types/posts';
import { UserFactory } from 'factories/UserFactory';
import { PostFactory } from 'factories/PostFactory';
import { Navigation } from './Navigation';
import { SearchBar } from './search/SearchBar';
import { UserAvatar } from './users/avatar/UserAvatar';

const loggedUser = UserFactory.make();
const users: User[] = UserFactory.make(3);
const posts: Post[] = PostFactory.make(3);

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useLocation: () => ({
    pathname: '/',
  }),
}));

describe('When rendering Navigation', () => {
  let layout: any;
  beforeEach(() => {
    layout = shallow(
      <Navigation
        users={users}
        posts={posts}
        loggedUser={loggedUser}
        isLoading={false}
      />
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
