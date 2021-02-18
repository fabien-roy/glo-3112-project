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

  return hashtags !== undefined ? (
    <CardActions>
      <LocalOfferTwoTone />
      {hashtags.map((usertag) => (
        <Button size="small" color="primary">
          {usertag}
        </Button>
      ))}
    </CardActions>
  ) : null;
};

export default HashtagsCardSection;
