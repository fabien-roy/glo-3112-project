import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { ChatTwoTone, LocalOfferTwoTone } from '@material-ui/icons';

export interface TagChipListProps {
  tagType: 'hashtag' | 'usertag';
  tags: Array<string>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  })
);

export const TagChipList: React.FC<TagChipListProps> = (
  props: TagChipListProps
) => {
  const classes = useStyles();
  const { tags, tagType } = props;
  const avatarIcon =
    tagType === 'usertag' ? <ChatTwoTone /> : <LocalOfferTwoTone />;

  return (
    <div className={classes.root}>
      {tags.map((tag) => (
        <Chip avatar={avatarIcon} size="small" label={tag} />
      ))}
    </div>
  );
};
