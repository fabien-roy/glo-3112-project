import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Post } from 'types/posts';
import { PostCard } from './PostCard';

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
    <Box mt={2}>
      <Grid container spacing={2}>
        {list}
      </Grid>
    </Box>
  );
}
export default PostList;
