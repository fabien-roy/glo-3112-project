import { List } from '@material-ui/core';
import React from 'react';
import { Comment } from 'components/posts/Comment';
import { UserComment } from 'types/posts';

export interface CommentListProps {
  comments: UserComment[];
}

export const CommentList: React.FC<CommentListProps> = (
  props: CommentListProps
) => {
  return (
    <List>
      {props.comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </List>
  );
};

export default CommentList;
