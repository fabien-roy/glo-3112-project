import { List } from '@material-ui/core';
import React from 'react';
import { Comment } from 'components/posts/Comment';
import { Post } from 'types/posts';

export interface CommentListProps {
  post: Post;
}

export const CommentList: React.FC<CommentListProps> = (
  props: CommentListProps
) => {
  return (
    <List>
      {props.post.comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </List>
  );
};

export default CommentList;
