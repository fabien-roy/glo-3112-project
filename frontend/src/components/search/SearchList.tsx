import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { User } from 'types/users';
import { Post } from 'types/posts';

import { Link } from 'react-router-dom';
import { UserAvatar } from '../users/avatar/UserAvatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

export interface SearchListProps {
  tab: number;
  users: User[];
  descriptionPosts: Post[];
  hashtagPosts: Post[];
}

export const SearchList: React.FC<SearchListProps> = (
  props: SearchListProps
) => {
  const classes = useStyles();

  const { users, descriptionPosts, hashtagPosts, tab } = props;

  let searchArray: any[];

  if (tab === 0) {
    searchArray = users;
  } else if (tab === 1) {
    searchArray = hashtagPosts;
  } else {
    searchArray = descriptionPosts;
  }

  // TODO : Something crashes when going to hashtags or description
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {tab === 0 && (
          <TableBody>
            {searchArray.map((row) => (
              <TableRow key={row.username}>
                <TableCell align="left" width="10%">
                  <UserAvatar
                    src={tab === 0 ? row.avatarReference : '#'}
                    size="small"
                    username={row.username}
                  />
                </TableCell>

                <TableCell align="left" width="30%">
                  <Link to={`/users/${row.username}`}>{row.username}</Link>
                </TableCell>

                <TableCell align="left">
                  <div className={classes.sectionDesktop}>
                    {row.firstName}&nbsp;{row.lastName}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {/* TODO : Here, we want each post and a link to the post */}
        {tab > 0 &&
          {
            /*
          <TableBody>
            {searchArray.map((row) => (
              <TableRow key={row}>
                <TableCell align="left" width="10%">
                  <Avatar>
                    {tab === 1 && '#'}
                    {tab === 2 && <DescriptionIcon />}
                  </Avatar>
                </TableCell>
                <TableCell align="left" width="30%">
                  {tab === 1 && (
                    <Link to={`/search/hashtag/${row}`}> {row}</Link>
                  )}
                  {tab === 2 && (
                    <Link to={`/search/description/${row}`}> {row}</Link>
                  )}
                </TableCell>
                <TableCell align="left">
                  {searchArray.length}&nbsp;posts
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          */
          }}
      </Table>
    </TableContainer>
  );
};

export default SearchList;
