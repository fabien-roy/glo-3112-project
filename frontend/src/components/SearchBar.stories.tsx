import React from 'react';
import { User } from 'types/users';
import { SearchBar } from './SearchBar';

export default {
  title: 'components/Search bar',
  component: SearchBar,
};

const users: User[] = [];
const isLoading = false;

export const Basic = () => <SearchBar users={users} isLoading={isLoading} />;
