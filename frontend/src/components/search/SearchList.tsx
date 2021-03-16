import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
        cursor: 'pointer',
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
  const postsDetails = {};

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
    let numHashtag = 1;
    post.hashtags.forEach((hashtag) => {
      if (hashtags.indexOf(hashtag) === -1) {
        hashtags.push(hashtag);
      } else {
        numHashtag += 1;
      }
      postsDetails[hashtag] = {
        type: 'hashtag',
        details: numHashtag === 1 ? '1 post' : `${numHashtag} posts`,
      };
    });
  });

  hashtags = sortArray(hashtags);

  if (tab === 0) {
    searchArray = users;
  } else {
    searchArray = hashtags;
  }

  const handleClick = (newRoute: string) => {
    history.push(newRoute);
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
                onClick={() => handleClick(`/users/${row.username}`)}
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
              <TableRow
                className={classes.tableRow}
                key={row.hashtag}
                onClick={() => handleClick(`/posts?hashtag=${row}`)}
              >
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
                  {row}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {postsDetails[row].details}
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
