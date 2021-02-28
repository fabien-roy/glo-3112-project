import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from 'components/users/avatar/UserAvatar';
import { Link } from 'react-router-dom';
import { User } from 'types/users';
import { AlertMessage } from 'components/AlertMessage';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from '@material-ui/core//CardActions';
import { TagsSection } from './TagsSection';

import PostImage from './PostImage';
import { ModalBox } from '../ModalBox';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

const useStyles = makeStyles(() =>
  createStyles({
    userLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
    card: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    cardContent: {
      height: '100%',
    },
  })
);

export interface PostCardProps {
  id: string;
  reference?: string;
  description?: string;
  hashtags?: string[];
  usertags?: string[];
  username: string;
  userAvatar?: string;
  createdAt?: Date;
  loggedUser?: User | null;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const {
    id,
    reference,
    description,
    hashtags,
    usertags,
    username,
    userAvatar,
    createdAt,
    loggedUser,
  } = props;
  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const loggedUserButtons =
    loggedUser?.username === username ? (
      <>
        <IconButton
          id="edit-post-button"
          color="inherit"
          aria-label="Edit post"
          onClick={() => setOpenEditModal(true)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          id="delete-post-button"
          color="inherit"
          aria-label="Delete post"
          onClick={() => setOpenDeleteModal(true)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ) : null;

  return username ? (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Link to={`/users/${username}`} className={classes.userLink}>
              <UserAvatar src={userAvatar} size="small" username={username} />
            </Link>
          }
          title={
            <Link to={`/users/${username}`} className={classes.userLink}>
              {username}
            </Link>
          }
          subheader={
            createdAt !== undefined
              ? new Date(createdAt).toLocaleDateString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })
              : undefined
          }
          action={loggedUserButtons}
        />

        <Link to={`/posts/${id}`}>
          <PostImage reference={reference} />
        </Link>
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <TagsSection tags={usertags} type="usertags" />
        </CardActions>
        <CardActions>
          <TagsSection tags={hashtags} type="hashtags" />
        </CardActions>
      </Card>
      <ModalBox
        openModal={openEditModal}
        closeModal={() => setOpenEditModal(false)}
        title="Edit Post"
      >
        <EditPost
          postId={id}
          successAction={() => setOpenEditModal(false)}
          existingDescription={description}
        />
      </ModalBox>
      <ModalBox
        openModal={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        title="Delete Post"
      >
        <DeletePost
          postId={id}
          successAction={() => setOpenDeleteModal(false)}
        />
      </ModalBox>
    </>
  ) : (
    <AlertMessage
      severity="error"
      title="HTTP 404"
      description="This post does not exist!"
    />
  );
};

PostCard.defaultProps = {
  loggedUser: null,
};

export default PostCard;
