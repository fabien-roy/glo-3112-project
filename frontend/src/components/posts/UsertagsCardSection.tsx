import React from 'react';
import { Button, CardActions } from '@material-ui/core';
import { ChatTwoTone } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export interface UsertagsCardSectionProps {
  usertags?: string[];
}

export const UsertagsCardSection: React.FC<UsertagsCardSectionProps> = (
  props: UsertagsCardSectionProps
) => {
  const { usertags } = props;

  return usertags !== undefined && usertags.length > 0 ? (
    <CardActions>
      <ChatTwoTone />
      {usertags.map((usertag, idx) => (
        <Link to={`/users/${usertag}`}>
          <Button
            size="small"
            color="primary"
            key={usertag.concat(idx.toString())}
          >
            {usertag}
          </Button>
        </Link>
      ))}
    </CardActions>
  ) : null;
};

export default UsertagsCardSection;
