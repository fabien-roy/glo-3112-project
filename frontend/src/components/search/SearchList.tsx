import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserQueryParams } from 'types/users';
import { ROUTE_PATHS } from 'router/Config';
import { Avatar, useMediaQuery } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import SearchImages from 'components/search/SearchImages';
import useGetUsers from 'hooks/users/useGetUsers';
import useQuery from 'hooks/useQuery';
import _ from 'lodash';
import { UserAvatar } from '../users/avatar/UserAvatar';
import { HashtagQueryParams } from '../../types/hashtags';
import useGetHashtags from '../../hooks/hashtags/useGetHashtags';
// import LoadingSpinner from 'components/LoadingSpinner';

// TO DO: PUT BACK LOADING SPINNER

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      maxWidth: '100%',
      maxHeight: 510,
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
    loadingText: {
      fontSize: '15px',
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
  })
);

export interface SearchListProps {
  tab: number;
  setListRef?: any;
}

const getHashtagQueryParams = (query: URLSearchParams): HashtagQueryParams => ({
  like: query.get('value') || undefined,
});

export const SearchList: React.FC<SearchListProps> = (
  props: SearchListProps
) => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const { tab, setListRef } = props;
  const listRef = React.useRef(null);

  const [last, setLast] = useState('');
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  const numberPerPage = 10;
  const getUserQueryParams = (
    after: string,
    limit: number
  ): UserQueryParams => ({
    after: after || undefined,
    limit: limit || undefined,
  });

  const { users } = useGetUsers(getUserQueryParams(last, numberPerPage));
  const [fetchedUsers, setFetchedUsers] = useState(users.results);

  const { hashtags } = useGetHashtags(getHashtagQueryParams(query));

  useEffect(() => {
    setListRef(listRef);
  });

  useEffect(() => {
    const concatUsers = _.unionBy(fetchedUsers, users.results, 'username');
    setFetchedUsers(concatUsers);
  }, [users]);

  function fetchMoreItems() {
    if (tab !== 0) return;
    const { lastKey } = users;
    const loaded = fetchedUsers.length === users.count;
    setLoadingCompleted(loaded);
    if (loaded) return;
    setTimeout(() => {
      setLast(lastKey);
    }, 200);
  }

  const handleClick = (newRoute: string) => {
    history.push(newRoute);
  };

  const smallMobile = useMediaQuery('(max-width:400px)');
  return (
    <div>
      <div>
        {tab < 2 && (
          <TableContainer className={classes.table} component={Paper}>
            <div
              id="scrollTable"
              ref={listRef}
              style={{ overflow: 'auto', maxHeight: 510 }}
            >
              <InfiniteScroll
                loadMore={fetchMoreItems}
                hasMore
                threshold={50}
                useWindow={false}
                loader={
                  <div className="loader" key={0}>
                    {loadingCompleted === false && tab === 0 && (
                      <Typography className={classes.loadingText}>
                        Loading ...
                      </Typography>
                    )}
                  </div>
                }
              >
                <Table className={classes.table} aria-label="simple table">
                  {tab === 0 && (
                    <TableBody>
                      {fetchedUsers.map((row) => (
                        <TableRow
                          className={classes.tableRow}
                          key={row.username}
                          onClick={() =>
                            handleClick(ROUTE_PATHS.user(row.username))
                          }
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
                      {hashtags.map((row) => (
                        <TableRow
                          key={row.name}
                          className={classes.tableRow}
                          onClick={() =>
                            handleClick(ROUTE_PATHS.feed(`hashtag=${row.name}`))
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
                            {row.name}
                          </TableCell>
                          <TableCell className={classes.tableCell} align="left">
                            {row.count === 1 ? '1 post' : `${row.count} posts`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </InfiniteScroll>
            </div>
          </TableContainer>
        )}
      </div>
      <div>{tab === 2 && <SearchImages />}</div>
    </div>
  );
};
export default SearchList;
