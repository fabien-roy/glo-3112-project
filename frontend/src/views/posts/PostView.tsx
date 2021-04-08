import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { PostCard } from 'components/posts/PostCard';
import useGetPost from 'hooks/posts/useGetPost';
import { useToasts } from 'react-toast-notifications';
import CommentSection from 'components/posts/CommentSection';
import { ROUTE_PATHS } from '../../router/Config';

interface ParamTypes {
  postId: string;
}

export const PostView = () => {
  const { postId } = useParams<ParamTypes>();
  const { post, isLoading, error, getPost } = useGetPost(postId);
  const { addToast } = useToasts();
  const history = useHistory();

  const commentSectionElement =
    history.location.hash === '#comment-section'
      ? document.getElementById('comment-section')
      : null;
  if (commentSectionElement) {
    commentSectionElement.scrollIntoView();
  }

  useEffect(() => {
    if (error) {
      addToast('Could not fetch post', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [error]);

  const loading = isLoading && !post ? <LoadingSpinner absolute /> : null;

  const content = (
    <Box display="flex">
      <Box margin="auto" marginTop="2vh" maxWidth="800px" width="100%">
        <PostCard
          post={post}
          refreshPost={() => history.push(ROUTE_PATHS.home)}
          fullSizeImage
        />
        <Box id="comment-section" marginTop="2vh">
          {post && <CommentSection post={post} successAction={getPost} />}
        </Box>
      </Box>
    </Box>
  );
  return (
    <>
      {content}
      {loading}
    </>
  );
};

export default PostView;
