import React from 'react';
import { useParams } from 'react-router-dom';
import useGetPost from 'hooks/useGetPost';
import { Box } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { PostCard } from '../../components/posts/PostCard';

interface ParamTypes {
  postId: string;
}

export const PostView = () => {
  const { postId } = useParams<ParamTypes>();
  const { post, isLoading } = useGetPost(postId);

  return isLoading === true ? (
    <LoadingSpinner absolute />
  ) : (
    <Box display="flex">
      <Box mx="auto" maxWidth={800} marginTop={3}>
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
