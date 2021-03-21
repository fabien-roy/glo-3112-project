import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useQuery from 'hooks/useQuery';

import { User } from 'types/users';
import { Post } from 'types/posts';

import { ROUTE_PATHS } from 'router/Config';

import { Avatar, useMediaQuery } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import SearchImages from 'components/search/SearchImages';
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
    noResultText: {
      textAlign: 'center',
      marginTop: '20px',
    },
  })
);

export interface SearchListProps {
  tab: number;
  users: User[];
  hashtagPosts: Post[];
  descriptionPosts: Post[];
}

export const SearchList: React.FC<SearchListProps> = (
  props: SearchListProps
) => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();

  const search = query.get('value') || '';
  const { users, hashtagPosts, descriptionPosts, tab } = props;

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
      if (hashtag.includes(search)) {
        if (hashtags.indexOf(hashtag) === -1) {
          hashtags.push(hashtag);
        } else {
          numHashtag += 1;
        }
        postsDetails[hashtag] = {
          type: 'hashtag',
          details: numHashtag === 1 ? '1 post' : `${numHashtag} posts`,
        };
      }
    });
  });

  hashtags = sortArray(hashtags);

  if (tab === 0) {
    searchArray = users;
  } else if (tab === 1) {
    searchArray = hashtags;
  } else {
    searchArray = descriptionPosts;
  }

  const handleClick = (newRoute: string) => {
    history.push(newRoute);
  };
  const smallMobile = useMediaQuery('(max-width:400px)');
  return searchArray.length > 0 ? (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          {tab === 0 && (
            <TableBody>
              {searchArray.map((row) => (
                <TableRow
                  className={classes.tableRow}
                  key={row.username}
                  onClick={() => handleClick(ROUTE_PATHS.user(row.username))}
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
                      {`${row.firstName} ${row.lastName}`}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
          {tab === 1 && (
            <TableBody>
              {searchArray.map((row) => (
                <TableRow
                  key={row}
                  className={classes.tableRow}
                  onClick={() =>
                    handleClick(ROUTE_PATHS.feed(`hashtag=${row}`))
                  }
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
                    width={smallMobile ? '20%' : '30%'}
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
      <div>{tab === 2 && <SearchImages posts={searchArray} />}</div>
    </div>
  ) : (
    <Typography className={classes.noResultText}>No result found</Typography>
  );
};

export default SearchList;
