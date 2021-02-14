import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { PostCard } from '../../components/posts/PostCard';

interface ParamTypes {
  postId: string;
}

export const Post = () => {
  const { postId } = useParams<ParamTypes>();
  const postCardStyles = {
    minHeight: '25vh',
    maxWidth: '800px',
    minWidth: '40vw',
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <PostCard id={postId} cardStyles={postCardStyles} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Post;
