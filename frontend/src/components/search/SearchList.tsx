import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DescriptionIcon from '@material-ui/icons/Description';

import { User } from 'types/users';
import { Post } from 'types/posts';

import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { UserAvatar } from '../users/avatar/UserAvatar';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface SearchListProps {
  tab: number;
  users: User[];
  posts: Post[];
}

export const SearchList: React.FC<SearchListProps> = (
  props: SearchListProps
) => {
  const classes = useStyles();

  const { users, posts, tab } = props;

  const hashtags: string[] = [];
  const keywords: string[] = [];
  let searchArray: any[] = [];

  posts.forEach((post) => {
    post.hashtags.forEach((hashtag) => {
      if (hashtags.indexOf(hashtag) === -1) {
        hashtags.push(hashtag);
      }
    });
  });

  posts.forEach((post) => {
    if (post.description) {
      const postkeywords = post.description.split(' ');
      postkeywords.forEach((postkeyword) => {
        if (
          hashtags.indexOf(postkeyword) === -1 &&
          keywords.indexOf(postkeyword) === -1
        ) {
          keywords.push(postkeyword);
        }
      });
    }
  });

  if (tab === 0) {
    searchArray = users;
  } else if (tab === 1) {
    searchArray = hashtags;
  } else {
    searchArray = keywords;
  }

  const content = (
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
                  {row.firstName}&nbsp;{row.lastName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {tab > 0 && (
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
        )}
      </Table>
    </TableContainer>
  );

  return <>{content}</>;
};

export default SearchList;
