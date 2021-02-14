import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { PostCard } from '../../components/posts/PostCard';

interface ParamTypes {
  postId: string;
}

export const Post = () => {
  const { postId } = useParams<ParamTypes>();

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', maxWidth: '100vw' }}
      >
        <PostCard />
        <Grid item xs={3} />
      </Grid>
      <h1>Post view!</h1>
      <h2>Post ID : {postId}</h2>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default Post;
