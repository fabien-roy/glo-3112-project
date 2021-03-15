import React from 'react';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchBar } from './SearchBar';

describe('When rendering SearchBar', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<SearchBar inSearchView={false} />));
  });

  let bar: any;
  beforeEach(() => {
    bar = shallow(<SearchBar inSearchView={false} />);
  });

  it('Should contain Search Bar place holder', () => {
    expect(bar.contains('Search'));
  });

  it('Should contain an Autocomplete', () => {
    expect(bar.find(Autocomplete)).lengthOf(1);
  });
});
