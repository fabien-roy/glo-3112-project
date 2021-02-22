import React from 'react';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
import { User } from 'types/users';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchBar } from './SearchBar';
import { UserFactory } from '../factories/UserFactory';

const users: User[] = [UserFactory.make()];

describe('When rendering SearchBar', () => {
  it('Should render', () => {
    render(<SearchBar users={users} isLoading={false} />);
  });

  let bar: any;
  beforeEach(() => {
    bar = shallow(<SearchBar users={users} isLoading={false} />);
  });

  it('Should contain Search Bar place holder', () => {
    expect(bar.contains('Search user'));
  });

  it('Should contain an Autocomplete', () => {
    expect(bar.find(Autocomplete)).lengthOf(1);
  });
});
