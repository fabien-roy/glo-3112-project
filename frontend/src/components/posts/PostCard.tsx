import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { UserAvatar } from 'components/users/UserAvatar';
import { Link } from 'react-router-dom';
import { AlertMessage } from 'components/AlertMessage';
import { CardActionArea } from '@material-ui/core';
import { UsertagsCardSection } from './UsertagsCardSection';
import { HashtagsCardSection } from './HashtagsCardSection';

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      paddingTop: '56.25%', // 16:9
    },
  })
);

export interface PostCardProps {
  id?: string;
  reference?: string;
  description?: string;
  hashtags?: string[];
  usertags?: string[];
  user?: string;
  createdAt?: Date;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const classes = useStyles();
  const { reference, description, hashtags, usertags, user, createdAt } = props;

  return user !== undefined ? (
    <Card>
      <CardHeader
        avatar={
          <Link to={`/users/${user}`}>
            <UserAvatar
              src={reference}
              size="small"
              username={user !== undefined ? user : ''}
            />
          </Link>
        }
        title={user}
        subheader={createdAt}
      />
      <CardActionArea>
        <CardMedia className={classes.media} image={reference} title={user} />
      </CardActionArea>
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <UsertagsCardSection usertags={usertags} />
      <HashtagsCardSection hashtags={hashtags} />
    </Card>
  ) : (
    <AlertMessage
      severity="error"
      title="HTTP 404"
      description="This post does not exist!"
    />
  );
};

export default PostCard;
