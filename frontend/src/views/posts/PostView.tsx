import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Card, makeStyles } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { PostCard } from 'components/posts/PostCard';
import useGetPost from 'hooks/posts/useGetPost';
import { useToasts } from 'react-toast-notifications';
import CommentList from 'components/posts/CommentList';
import CommentForm from 'components/posts/CommentForm';
import { ROUTE_PATHS } from '../../router/Config';

interface ParamTypes {
  postId: string;
}

const useStyles = makeStyles(() => ({
  card: {
    padding: '10px',
  },
}));

export const PostView = () => {
  const { postId } = useParams<ParamTypes>();
  const { post, isLoading, error, getPost } = useGetPost(postId);
  const { addToast } = useToasts();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      addToast('Could not fetch post', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [error]);

  const content = isLoading ? (
    <LoadingSpinner absolute />
  ) : (
    <Box display="flex">
      <Box margin="auto" marginTop="2vh" maxWidth="800px" width="100%">
        <PostCard
          post={post}
          refreshPost={() => history.push(ROUTE_PATHS.home)}
          fullSizeImage
        />
        <Box marginTop="2vh">
          <Card className={classes.card}>
            <CommentForm post={post} successAction={() => getPost()} />
            <CommentList post={post} />
          </Card>
        </Box>
      </Box>
    </Box>
  );

  return <>{content}</>;
};

export default PostView;
