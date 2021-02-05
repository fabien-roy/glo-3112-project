import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface ParamTypes {
  username: string;
}

export const User = () => {
  const { username } = useParams<ParamTypes>();

  return (
    <div>
      <h1>User view!</h1>
      <h2>Username : {username}</h2>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default User;
