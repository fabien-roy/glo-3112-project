import React from 'react';
import { UserComment } from 'types/posts';
import {
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
} from '@material-ui/core';
import { UserAvatar } from 'components/users/avatar/UserAvatar';

export interface CommentProps {
  comment: UserComment;
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <UserAvatar username={props.comment.user} />
        </ListItemAvatar>
        <ListItemText
          primary={props.comment.text}
          secondary={props.comment.user}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default Comment;
