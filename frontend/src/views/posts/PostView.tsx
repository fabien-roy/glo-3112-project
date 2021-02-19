import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { PostCard } from 'components/posts/PostCard';
import useGetPost from 'hooks/posts/useGetPost';

interface ParamTypes {
  postId: string;
}

export const PostView = () => {
  const { postId } = useParams<ParamTypes>();
  const { post, isLoading } = useGetPost(postId);

  return isLoading ? (
    <LoadingSpinner absolute />
  ) : (
    <Box display="flex">
      <Box margin="auto" marginTop="2vh" maxWidth="800px" width="100%">
        <PostCard
          id={post?.id}
          description={post?.description}
          reference={post?.reference}
          hashtags={post?.hashtags}
          usertags={post?.usertags}
          user={post?.user}
        />
      </Box>
    </Box>
  );
};

export default PostView;
