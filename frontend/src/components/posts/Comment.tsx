import React from 'react';
import { UserComment } from 'types/posts';
import { ListItemAvatar, ListItemText, ListItem } from '@material-ui/core';
import { UserAvatar } from 'components/users/avatar/UserAvatar';

export interface CommentProps {
  comment: UserComment;
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { comment } = props;

  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar
          username={comment.user}
          src={comment.userAvatar}
          size="smallSize"
        />
      </ListItemAvatar>
      <ListItemText
        primary={comment.text}
        secondary={`${comment.user}, on ${new Date(
          comment?.createdAt
        ).toLocaleDateString([], {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })}`}
      />
    </ListItem>
  );
};

export default Comment;
