import React from 'react';
import { Box, Button, createStyles, makeStyles } from '@material-ui/core';
import { ChatTwoTone, LocalOfferTwoTone } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export interface TagsSectionProps {
  tags?: string[];
  type?: 'usertags' | 'hashtags';
}

const useStyles = makeStyles(() =>
  createStyles({
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
    <Box>
      {icon}
      {tags.map((tag, idx) =>
        type === 'usertags' ? (
          <Link to={`/users/${tag}`} key={tag.concat(idx.toString())}>
            <Button size="small" color="primary" title={tag}>
              <span className={classes.tagText}>{tag}</span>
            </Button>
          </Link>
        ) : (
          <Link to={`/posts?hashtag=${tag}`} key={tag.concat(idx.toString())}>
            <Button size="small" color="primary" title={tag}>
              <span className={classes.tagText}>{tag}</span>
            </Button>
          </Link>
        )
      )}
    </Box>
  ) : null;
};

export default TagsSection;
