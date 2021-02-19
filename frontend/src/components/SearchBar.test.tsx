import React from 'react';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
import { User } from 'types/users';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchBar } from './SearchBar';

const users: User[] = [
  {
    username: 'TestUser',
    email: 'TestUser1@ugram.com',
    phoneNumber: '450-666-7777',
    firstName: 'Test',
    lastName: 'User1',
    description: '',
    avatarReference:
      'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
  },
];

const usersResponse = {
  users,
  error: null,
  isLoading: false,
};

describe('When rendering SearchBar', () => {
  it('Should render', () => {
    render(<SearchBar users={users} isLoading={false} />);
  });

  let bar: any;
  beforeEach(() => {
    bar = shallow(<SearchBar users={users} isLoading={false} />);
  });

  it('Should contain Search Bar place holder', () => {
    expect(bar.contains('Search Bar'));
  });

  it('Should contain an Autocomplete', () => {
    expect(bar.find(Autocomplete)).lengthOf(1);
  });
});
