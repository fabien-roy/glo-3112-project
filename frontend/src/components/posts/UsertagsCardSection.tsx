import React from 'react';
import { Button, CardActions } from '@material-ui/core';
import { ChatTwoTone } from '@material-ui/icons';

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
        <Button
          size="small"
          color="primary"
          key={usertag.concat(idx.toString())}
        >
          {usertag}
        </Button>
      ))}
    </CardActions>
  ) : null;
};

export default UsertagsCardSection;
