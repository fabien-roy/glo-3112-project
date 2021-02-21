import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { Link } from 'react-router-dom';
import { AlertMessage } from 'components/AlertMessage';
import { UsertagsCardSection } from './UsertagsCardSection';
import { HashtagsCardSection } from './HashtagsCardSection';
import PostImage from './PostImage';

const useStyles = makeStyles(() =>
  createStyles({
    userLink: {
      textDecoration: 'none',
      color: 'inherit',
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
  createdAt?: string;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const {
    id,
    reference,
    description,
    hashtags,
    usertags,
    user,
    createdAt,
  } = props;
  const classes = useStyles();

  return user !== undefined ? (
    <Card>
      <Link to={`/users/${user}`} className={classes.userLink}>
        <CardHeader
          avatar={<UserAvatar src={reference} size="small" username={user} />}
          title={user}
          subheader={createdAt}
        />
      </Link>
      <Link to={`/posts/${id}`}>
        <PostImage reference={reference} />
      </Link>
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
