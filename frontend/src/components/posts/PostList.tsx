import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Post } from 'types/posts';
import { createStyles, makeStyles } from '@material-ui/core';
import { PostCard } from './PostCard';
import { User } from '../../types/users';

export interface PostListProps {
  posts: Post[];
  loggedUser?: User | null;
  setPosts?: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    cardList: {
      display: 'flex',
    },
  })
);

export const PostList = (props: PostListProps) => {
  const { posts: freshPosts, loggedUser } = props;
  const classes = useStyles();
  const [posts, setPosts] = useState(freshPosts);

  const deleteAction = (deletedPostId: string) => {
    const newPostslol = posts.filter((post) => post._id !== deletedPostId);
    setPosts(newPostslol);
  };

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} md={4} className={classes.cardList}>
            <PostCard
              post={post}
              loggedUser={loggedUser}
              deleteAction={deleteAction}
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
