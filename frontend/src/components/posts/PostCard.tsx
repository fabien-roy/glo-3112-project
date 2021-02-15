import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { purple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export interface PostCardProps {
  id?: string;
  reference?: string;
  description?: string;
  tags?: string[];
  user?: string;
  createdAt?: Date;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: '800px',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      maxHeight: 500,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: purple[500],
    },
  })
);

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const classes = useStyles();
  const size = useWindowDimensions();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1611660246350-e206e04bd966?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80"
        title="Test Post Image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {size.height}
          {size.width}
          More text More text More text More text More text More text More text
          More text More text More text More text More text More text More text
          More text More text More text More text More text
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
