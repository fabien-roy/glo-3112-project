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
import { Post } from 'types/posts';
import { ROUTE_PATHS } from 'router/Config';
import { Avatar, useMediaQuery } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import SearchImages from 'components/search/SearchImages';
import useGetUsers from 'hooks/users/useGetUsers';
import { UserAvatar } from '../users/avatar/UserAvatar';
import { HashtagQueryParams } from '../../types/hashtags';
import useGetHashtags from '../../hooks/hashtags/useGetHashtags';

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
  descriptionPosts: Post[];
  setListRef: any;
}

export const SearchList: React.FC<SearchListProps> = (
  props: SearchListProps
) => {
  const classes = useStyles();
  const history = useHistory();
  const { descriptionPosts, tab, setListRef } = props;
  const listRef = React.useRef(null);

  const [last, setLast] = useState('');
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  let numberPerPage = 12;
  const getUserQueryParams = (
    after: string,
    limit: number
  ): UserQueryParams => ({
    after: after || undefined,
    limit: limit || undefined,
  });

  const getHashtagQueryParams = (
    after: string,
    limit: number
  ): HashtagQueryParams => ({
    after: after || undefined,
    limit: limit || undefined,
  });

  const { hashtags } = useGetHashtags(
    getHashtagQueryParams(last, numberPerPage)
  );

  const { users } = useGetUsers(getUserQueryParams(last, numberPerPage));

  let searchArray: any[];
  const postsDetails = {};

  const [listUsers, setListUsers] = useState(users.results);
  // const [listHashtags, setListHashtags] = useState(hashtags.results);
  const [listHashtags, setListHashtags] = useState([]); // NE RETOURNE PAS DES PageResult<Hashtag> don arrange un peu n'importe comment en attendant

  useEffect(() => {
    setListRef(listRef);
  });

  useEffect(() => {
    setListRef(listRef);
    setListUsers(listUsers.concat(users.results));
    numberPerPage = 10;
  }, [users]);

  useEffect(() => {
    setListHashtags(listHashtags.concat(hashtags));
    numberPerPage = 10;
  }, [hashtags]);

  if (listHashtags && listHashtags.length > 0) {
    listHashtags.forEach((listHashtag) => {
      postsDetails[listHashtag.name] = {
        type: 'hashtag',
        details:
          listHashtag.count === 1 ? '1 post' : `${listHashtag.count} posts`,
      };
    });
  }

  function fetchMoreItems() {
    let lastKey = '';
    if (tab === 0) {
      lastKey = users.lastKey;
    } else if (tab === 1) {
      lastKey = hashtags.lastKey;
    }
    const loaded =
      tab === 0 ? listUsers.length === users.count : listHashtags.length < 15; // hashtags.count pas disponible..!! je met une constante juste en attendant
    if (loaded) {
      setLoadingCompleted(true);
      return;
    }
    setTimeout(() => {
      setLast(lastKey);
    }, 100);
  }

  const handleClick = (newRoute: string) => {
    history.push(newRoute);
  };

  if (tab === 0) {
    searchArray = listUsers;
  } else if (tab === 1) {
    searchArray = listHashtags;
  } else {
    searchArray = descriptionPosts;
  }

  const smallMobile = useMediaQuery('(max-width:400px)');
  return searchArray.length > 0 ? (
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
                  {loadingCompleted === false && (
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
                    {listUsers.map((row) => (
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
                    {searchArray.map((row) => (
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
                          {postsDetails[row.name].details}
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
      <div>{tab === 2 && <SearchImages posts={searchArray} />}</div>
    </div>
  ) : (
    <Typography className={classes.noResultText}>No result found</Typography>
  );
};

export default SearchList;
