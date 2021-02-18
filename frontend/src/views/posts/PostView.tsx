import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useGetPost from 'hooks/useGetPost';
import { Box } from '@material-ui/core';
import { PostCard } from '../../components/posts/PostCard';

interface ParamTypes {
  postId: string;
}
const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: '2vh',
    marginBottom: '2vh',
    minHeight: '25vh',
    maxWidth: '800px',
    minWidth: '50vw',
    width: '100%',
    margin: 'auto',
  },
};

const useStyles = makeStyles(styles);

export const PostView = () => {
  const classes = useStyles();
  const { postId } = useParams<ParamTypes>();
  const { post } = useGetPost(postId);

  return (
    <Box display="flex">
      <Box mr={2} mx="auto" className={classes.card}>
        <PostCard
          id={post?.id}
          description={post?.description}
          reference={post?.reference}
          tags={post?.tags}
          user={post?.user}
        />
      </Box>
    </Box>
  );
};

export default PostView;
