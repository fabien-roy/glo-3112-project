import React from 'react';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
import { User } from 'types/users';
import { Post } from 'types/posts';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchBar } from './SearchBar';
import { UserFactory } from '../../factories/UserFactory';
import { PostFactory } from '../../factories/PostFactory';

const users: User[] = [UserFactory.make()];
const posts: Post[] = [PostFactory.make()];

describe('When rendering SearchBar', () => {
  it('Should render', () => {
    render(
      wrapInMemoryRouter(
        <SearchBar
          users={users}
          posts={posts}
          isLoading={false}
          inSearchView={false}
        />
      )
    );
  });

  let bar: any;
  beforeEach(() => {
    bar = shallow(
      <SearchBar
        users={users}
        posts={posts}
        isLoading={false}
        inSearchView={false}
      />
    );
  });

  it('Should contain Search Bar place holder', () => {
    expect(bar.contains('Search user'));
  });

  it('Should contain an Autocomplete', () => {
    expect(bar.find(Autocomplete)).lengthOf(1);
  });
});
