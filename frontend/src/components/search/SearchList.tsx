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
import { purple } from '@material-ui/core/colors';
import useGetUsers from 'hooks/users/useGetUsers';
import useQuery from 'hooks/useQuery';
import _ from 'lodash';
import { UserAvatar } from '../users/avatar/UserAvatar';
import LoadingSpinner from '../LoadingSpinner';
import SearchListPosts from './SearchListPosts';
import SearchListHashtags from './SearchListHashtags';

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

const getUserQueryParams = (
  searchValue: string,
  after: string,
  limit: number
): UserQueryParams => ({
  username: searchValue || undefined,
  after: after || undefined,
  limit: limit || undefined,
});

const SearchList: React.FC<SearchListProps> = (props: SearchListProps) => {
  const classes = useStyles();
  const history = useHistory();
  const searchValue = useQuery().get('value');
  const { tab, setListRef } = props;
  const listRef = React.useRef(null);

  const [lastKey, setLastKey] = useState(undefined);

  const numberPerPage = 10;

  const { users } = useGetUsers(
    getUserQueryParams(searchValue, lastKey, numberPerPage)
  );
  const [fetchedUsers, setFetchedUsers] = useState(users.results);

  useEffect(() => {
    setListRef(listRef);
  });

  useEffect(() => {
    setFetchedUsers([]);
    setLastKey(undefined);
    users.results = [];
  }, [searchValue]);

  useEffect(() => {
    const concatUsers = _.unionBy(fetchedUsers, users.results, 'username');
    setFetchedUsers(concatUsers);
  }, [lastKey]);

  const loadMoreUsers = () => {
    if (tab === 0) {
      setLastKey(users.lastKey);
    }
  };

  const handleClick = (newRoute: string) => {
    history.push(newRoute);
  };

  return (
    <div>
      <div>
        {tab === 0 && (
          <TableContainer className={classes.table} component={Paper}>
            <div
              id="scrollTable"
              ref={listRef}
              style={{ overflow: 'auto', maxHeight: 510 }}
            >
              <InfiniteScroll
                loadMore={loadMoreUsers}
                hasMore={tab === 0 && users.count > fetchedUsers.length}
                threshold={50}
                useWindow={false}
                loader={<LoadingSpinner key={0} />}
              >
                <Table className={classes.table} aria-label="simple table">
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
                </Table>
              </InfiniteScroll>
            </div>
          </TableContainer>
        )}
      </div>
      <div>{tab === 1 && <SearchListHashtags />}</div>
      <div>{tab === 2 && <SearchListPosts />}</div>
    </div>
  );
};

export default SearchList;
