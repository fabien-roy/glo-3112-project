import React from 'react';
import { Link } from 'react-router-dom';

// TODO : Remove this view
export const Users = () => {
  return (
    <div>
      <h1>Users view!</h1>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default Users;
