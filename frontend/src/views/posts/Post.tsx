import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useGetPost from 'hooks/useGetPost';
import { PostCard } from '../../components/posts/PostCard';

interface ParamTypes {
  postId: string;
}

const styles = {
  card: {
    marginTop: '2vh',
  },
};

const useStyles = makeStyles(styles);

export const Post = () => {
  const classes = useStyles();
  const { postId } = useParams<ParamTypes>();
  const [post, isLoading, error, fetchData] = useGetPost(postId);

  // TODO : Remove console log
  // eslint-disable-next-line no-console
  console.log(post);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid className={classes.card} item>
        <PostCard {...post} />
      </Grid>
    </Grid>
  );
};

export default Post;
