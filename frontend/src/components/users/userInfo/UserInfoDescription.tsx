import React from 'react';
import Box from '@material-ui/core/Box';

interface UserInfoDescriptionProps {
  fullname: string;
  description: string;
}

export function UserInfoDescription(props: UserInfoDescriptionProps) {
  const { fullname, description } = props;

  return (
    <Box>
      <div id="UserInfoDescriptionFullName">
        <b>{fullname}</b>
      </div>
      <div id="UserInfoDescriptionDescription">{description}</div>
    </Box>
  );
}
