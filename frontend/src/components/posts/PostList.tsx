import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Post } from 'types/posts';
import { PostCard } from './PostCard';

export interface PostListProps {
  posts: Post[];
}

export const PostList = (props: PostListProps) => {
  const { posts } = props;

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} md={4}>
            <PostCard
              id={post._id}
              description={post.description}
              reference={post.reference}
              hashtags={post.hashtags}
              usertags={post.usertags}
              user={post.user}
              createdAt={post.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default PostList;
