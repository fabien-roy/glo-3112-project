import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Post } from 'types/posts';
import { createStyles, makeStyles } from '@material-ui/core';
import { PostCard } from './PostCard';

export interface PostListProps {
  posts: Post[];
  setPosts?: () => void;
  refreshPosts: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    cardList: {
      display: 'flex',
    },
  })
);

export const PostList = (props: PostListProps) => {
  const { posts, refreshPosts } = props;
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} md={4} className={classes.cardList}>
            <PostCard
              post={post}
              refreshPost={refreshPosts}
              image={post.thumbnail}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

PostList.defaultProps = {
  loggedUser: null,
};

export default PostList;
