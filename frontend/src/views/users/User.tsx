import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

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
