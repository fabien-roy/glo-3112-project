import React from 'react';
import { Button, CardActions } from '@material-ui/core';
import { LocalOfferTwoTone } from '@material-ui/icons';

export interface HashtagsCardSectionProps {
  hashtags?: string[];
}

export const HashtagsCardSection: React.FC<HashtagsCardSectionProps> = (
  props: HashtagsCardSectionProps
) => {
  const { hashtags } = props;

  return hashtags !== undefined && hashtags.length > 0 ? (
    <CardActions>
      <LocalOfferTwoTone />
      {hashtags.map((hashtag, idx) => (
        <Button
          size="small"
          color="primary"
          key={hashtag.concat(idx.toString())}
        >
          {hashtag}
        </Button>
      ))}
    </CardActions>
  ) : null;
};

export default HashtagsCardSection;
