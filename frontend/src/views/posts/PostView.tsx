import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Card } from '@material-ui/core';
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

export const PostView = () => {
  const { postId } = useParams<ParamTypes>();
  const { post, isLoading, error } = useGetPost(postId);
  const { addToast } = useToasts();
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
          <Card style={{ padding: '10px' }}>
            <CommentForm post={post} />
            <CommentList post={post} />
          </Card>
        </Box>
      </Box>
    </Box>
  );

  return <>{content}</>;
};

export default PostView;
