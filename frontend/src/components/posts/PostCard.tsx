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
import { Post } from 'types/posts';
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
  post?: Post | undefined;
  loggedUser?: User | null;
  deleteAction?: (deletedPostId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const { post: freshPost, loggedUser, deleteAction } = props;
  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [post, setPost] = useState(freshPost);

  const loggedUserButtons =
    loggedUser?.username === post?.user ? (
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

  return post?.user ? (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Link to={`/users/${post?.user}`} className={classes.userLink}>
              <UserAvatar
                src={post?.userAvatar}
                size="small"
                username={post?.user}
              />
            </Link>
          }
          title={
            <Link to={`/users/${post?.user}`} className={classes.userLink}>
              {post?.user}
            </Link>
          }
          subheader={
            post?.createdAt !== undefined
              ? new Date(post?.createdAt).toLocaleDateString([], {
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

        <Link to={`/posts/${post?._id}`}>
          <PostImage reference={post?.reference} />
        </Link>
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" color="textSecondary">
            {post?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <TagsSection tags={post?.usertags} type="usertags" />
        </CardActions>
        <CardActions>
          <TagsSection tags={post?.hashtags} type="hashtags" />
        </CardActions>
      </Card>
      <ModalBox
        openModal={openEditModal}
        closeModal={() => setOpenEditModal(false)}
        title="Edit Post"
      >
        <EditPost
          postId={post?._id}
          successAction={(newPost: Post) => {
            setPost(newPost);
            setOpenEditModal(false);
          }}
          existingDescription={post?.description}
        />
      </ModalBox>
      <ModalBox
        openModal={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        title="Delete Post"
      >
        <DeletePost
          postId={post?._id}
          successAction={(deletedPostId: string | undefined | null) => {
            if (deleteAction !== undefined) {
              deleteAction(deletedPostId!);
            }
            setOpenDeleteModal(false);
          }}
          cancelAction={() => setOpenDeleteModal(false)}
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
