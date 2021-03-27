import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useUpdatePost from 'hooks/posts/useUpdatePost';
import LoadingSpinner from 'components/LoadingSpinner';
import { Post } from 'types/posts';
import { useToasts } from 'react-toast-notifications';
import PostForm from './PostForm';

interface EditPostFormSubmitValues {
  description: string;
  hashtags: string[];
  usertags: string[];
}
interface EditPostProps {
  postId?: string | null;
  successAction: (newPost: Post) => void;
  existingDescription?: string;
  existingUsertags?: string[];
}

export const EditPost = (props: EditPostProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    postId,
    successAction,
    existingDescription,
    existingUsertags,
  } = props;
  const [submitValues, setSubmitValues] = useState<EditPostFormSubmitValues>();
  const { updatePost, post, isLoading, error: APIError } = useUpdatePost(
    postId!
  );
  const { addToast } = useToasts();

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    setSubmitValues(values);
  };

  useEffect(() => {
    if (submitValues) {
      updatePost({
        description: submitValues.description,
        hashtags: submitValues.hashtags,
        usertags: submitValues.usertags,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitValues]);

  useEffect(() => {
    if (!APIError && post) {
      successAction(post);
      addToast('Post updated successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else if (APIError) {
      addToast('Could not update post', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, APIError]);

  return (
    <>
      <PostForm
        isMobile={isMobile}
        onSubmit={onSubmit}
        existingDescription={existingDescription}
        existingUsertags={existingUsertags}
        action="edit"
      />
      {isLoading && submitValues && <LoadingSpinner absolute />}
    </>
  );
};

EditPost.defaultProps = {
  postId: null,
  existingDescription: '',
  existingUsertags: [],
};

export default EditPost;
