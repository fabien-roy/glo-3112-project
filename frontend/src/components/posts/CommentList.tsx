import { Divider, List } from '@material-ui/core';
import React from 'react';
import { Comment } from 'components/posts/Comment';
import { Post } from 'types/posts';

export interface CommentListProps {
  post: Post;
}

export const CommentList: React.FC<CommentListProps> = (
  props: CommentListProps
) => (
  <List>
    {props.post.comments
      .slice(0)
      .reverse()
      .map((comment) => (
        <>
          <Comment comment={comment} />
          <Divider />
        </>
      ))}
  </List>
);

export default CommentList;
