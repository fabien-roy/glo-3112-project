import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import SearchList, { SearchListProps } from './SearchList';

export default {
  title: 'components/search/SearchList',
  component: SearchList,
};

const Template: Story<SearchListProps> = ({ ...args }) =>
  wrapInMemoryRouter(<SearchList {...args} />);

export const WithUser = Template.bind({});
WithUser.args = {
  tab: 0,
};

export const WithHashtagsPosts = Template.bind({});
WithHashtagsPosts.args = {
  tab: 1,
};
