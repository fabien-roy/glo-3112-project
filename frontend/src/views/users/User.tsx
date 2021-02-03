import React from 'react';
import { Link } from 'react-router-dom';

export const User = () => {
  return (
    <div>
      <h1>User view!</h1>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default User;
