import React from 'react';
import { Box, Button, createStyles, makeStyles } from '@material-ui/core';
import { ChatTwoTone, LocalOfferTwoTone } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from 'router/Config';

export interface TagsSectionProps {
  tags?: string[];
  type?: 'usertags' | 'hashtags';
}

const useStyles = makeStyles(() =>
  createStyles({
    tagBox: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    tagText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '125px',
    },
  })
);

export const TagsSection: React.FC<TagsSectionProps> = (
  props: TagsSectionProps
) => {
  const { tags, type } = props;
  const classes = useStyles();
  const icon = type === 'usertags' ? <ChatTwoTone /> : <LocalOfferTwoTone />;

  return tags !== undefined && tags.length > 0 ? (
    <Box className={classes.tagBox}>
      {icon}
      {tags.map((tag, idx) => (
        <Link
          to={
            type === 'usertags'
              ? ROUTE_PATHS.user(tag)
              : ROUTE_PATHS.feed(`hashtag=${tag}`)
          }
          key={tag.concat(idx.toString())}
        >
          <Button size="small" color="primary" title={tag}>
            <span className={classes.tagText}>{tag}</span>
          </Button>
        </Link>
      ))}
    </Box>
  ) : null;
};

export default TagsSection;
