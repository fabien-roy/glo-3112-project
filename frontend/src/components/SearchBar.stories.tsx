import React from 'react';
import { SearchBar } from './SearchBar';

export default {
  title: 'components/SearchBar',
  component: SearchBar,
  argTypes: { handleInputChange: { action: 'inputChanged' } },
};

export const Basic = () => <SearchBar />;
