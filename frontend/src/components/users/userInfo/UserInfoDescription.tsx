import React from 'react';
import Box from '@material-ui/core/Box';

interface UserInfoDescriptionProps {
  fullname: string;
  description: string;
}

export default function UserInfoDescription(props: UserInfoDescriptionProps) {
  const { fullname, description } = props;

  return (
    <Box>
      <div>
        <b>{fullname}</b>
      </div>
      <div>{description}</div>
    </Box>
  );
}
