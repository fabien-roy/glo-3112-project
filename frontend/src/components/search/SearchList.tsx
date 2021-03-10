import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { User } from 'types/users';
import { Post } from 'types/posts';

import { Avatar } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { UserAvatar } from '../users/avatar/UserAvatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    tableRow: {
      '&:hover': {
        backgroundColor: purple[50],
      },
    },
    tableCell: {
      paddingLeft: '15px',
      paddingTop: '5px',
      paddingBottom: '5px',
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
  hashtagPosts: Post[];
}

export const SearchList: React.FC<SearchListProps> = (
  props: SearchListProps
) => {
  const classes = useStyles();
  const history = useHistory();

  const { users, hashtagPosts, tab } = props;

  let searchArray: any[];
  let hashtags: string[] = [];

  const sortArray = (options: string[]) => {
    options.sort((option1, option2) => {
      if (option1.toLowerCase() < option2.toLowerCase()) {
        return -1;
      }
      if (option1.toLowerCase() > option2.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return options;
  };

  hashtagPosts.forEach((post) => {
    post.hashtags.forEach((hashtag) => {
      if (hashtags.indexOf(hashtag) === -1) {
        hashtags.push(hashtag);
      }
    });
  });

  hashtags = sortArray(hashtags);

  if (tab === 0) {
    searchArray = users;
  } else {
    searchArray = hashtags;
  }

  const handleClick = (option: string) => {
    let searchRoute: string;

    history.push(`/users/${option}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {tab === 0 && (
          <TableBody>
            {searchArray.map((row) => (
              <TableRow
                className={classes.tableRow}
                key={row.username}
                onClick={(event) => handleClick(row.username)}
              >
                <TableCell
                  className={classes.tableCell}
                  align="left"
                  width="10%"
                >
                  <UserAvatar
                    src={tab === 0 ? row.avatarReference : '#'}
                    size="small"
                    username={row.username}
                  />
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="left"
                  width="30%"
                >
                  {row.username}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  <div className={classes.sectionDesktop}>
                    {row.firstName}&nbsp;{row.lastName}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {tab > 0 && (
          <TableBody>
            {searchArray.map((row) => (
              <TableRow key={row}>
                <TableCell
                  className={classes.tableCell}
                  align="left"
                  width="10%"
                >
                  <Avatar>{tab === 1 && '#'}</Avatar>
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="left"
                  width="30%"
                >
                  {tab === 1 && (
                    <Link to={`/posts?hashtag=${row}`}> {row}</Link>
                  )}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {searchArray.length}&nbsp;posts
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default SearchList;
