import React from 'react';
import { Grid } from '@material-ui/core';
import { PostCard } from './PostCard';
import { Post } from '../../types/posts';

export function PostList(props: { posts: Post[] }) {
  const { posts } = props;
  const list = posts.map((post) => {
    return (
      <Grid item key={post._id} xs={12} md={4}>
        <PostCard
          id={post._id}
          description={post.description}
          reference={post.reference}
          hashtags={post.hashtags}
          usertags={post.usertags}
          user={post.user}
        />
      </Grid>
    );
  });
  return (
    <Grid container spacing={2}>
      {list}
    </Grid>
  );
}
export default PostList;
