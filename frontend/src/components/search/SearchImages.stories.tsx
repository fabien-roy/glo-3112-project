import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { SearchImages } from './SearchImages';

export default {
  title: 'components/search/SearchImages',
  component: SearchImages,
};

export const Basic = () => <SearchImages/>;
