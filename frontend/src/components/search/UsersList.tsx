import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { User } from 'types/users';

import { UserAvatar } from '../users/avatar/UserAvatar';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface UsersListProps {
  users: User[];
}

export const UsersList: React.FC<UsersListProps> = (props: UsersListProps) => {
  const classes = useStyles();

  const { users } = props;

  const content = (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">User name</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.username}>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.firstName}</TableCell>
              <TableCell align="left">{row.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return <>{content}</>;
};

export default UsersList;
