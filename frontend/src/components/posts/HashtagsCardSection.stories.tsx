import React from 'react';
import { Story } from '@storybook/react';
import { PostFactory } from 'factories/PostFactory';
import HashtagsCardSection, {
  HashtagsCardSectionProps,
} from './HashtagsCardSection';

const post = PostFactory.make();

export default {
  title: 'components/posts/HashtagsCardSection',
  component: HashtagsCardSection,
};

const Template: Story<HashtagsCardSectionProps> = ({ ...args }) => (
  <HashtagsCardSection {...args} />
);

export const WithHashtags = Template.bind({});
WithHashtags.args = {
  hashtags: post.hashtags,
};

export const WithoutHashtag = Template.bind({});
WithoutHashtag.args = {
  hashtags: [],
};
