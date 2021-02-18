import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { UserAvatar } from 'components/users/UserAvatar';
import { AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    alert: {
      width: '100%',
    },
    box: {
      maxWidth: '800px',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      maxHeight: 500,
    },
  })
);

export interface PostCardProps {
  id?: string;
  reference?: string;
  description?: string;
  tags?: string[];
  user?: string;
  createdAt?: Date;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const classes = useStyles();
  const { reference, description, tags, user, createdAt } = props;

  return user !== undefined ? (
    <Box mx="auto" className={classes.box}>
      <Card>
        <CardHeader
          avatar={
            <UserAvatar
              src={reference}
              size="small"
              username={user !== undefined ? user : ''}
            />
          }
          title={user}
          subheader={createdAt}
        />
        <CardMedia className={classes.media} image={reference} title={user} />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  ) : (
    <Alert severity="error" className={classes.alert}>
      <AlertTitle>Error 404</AlertTitle>
      This post does not exist!
    </Alert>
  );
};

export default PostCard;
