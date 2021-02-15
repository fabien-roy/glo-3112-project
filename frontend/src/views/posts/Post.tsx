import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useGetPost from 'hooks/useGetPost';
import { PostCard } from '../../components/posts/PostCard';

interface ParamTypes {
  postId: string;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: '2vh',
    marginBottom: '2vh',
  },
});

const useStyles = makeStyles(styles);

export const Post = () => {
  const classes = useStyles();
  const { postId } = useParams<ParamTypes>();

  const post = useGetPost(postId);

  // TODO : Remove console log
  // eslint-disable-next-line no-console
  console.log(post);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid className={classes.card} item>
          <PostCard id={postId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Post;
