import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { Link } from 'react-router-dom';
import { AlertMessage } from 'components/AlertMessage';
import { UsertagsCardSection } from './UsertagsCardSection';
import { HashtagsCardSection } from './HashtagsCardSection';
import PostImage from './PostImage';

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
  const { reference, description, hashtags, usertags, user, createdAt } = props;

  return user !== undefined ? (
    <Card>
      <CardHeader
        avatar={
          <Link to={`/users/${user}`}>
            <UserAvatar src={reference} size="small" username={user} />
          </Link>
        }
        title={user}
        subheader={createdAt}
      />
      <PostImage reference={reference} />
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
