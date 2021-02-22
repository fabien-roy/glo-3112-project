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
import { UsertagsCardSection } from './UsertagsCardSection';
import { HashtagsCardSection } from './HashtagsCardSection';
import PostImage from './PostImage';
import { ModalBox } from '../ModalBox';
import EditPost from './EditPost';

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
    user,
    createdAt,
    loggedUser,
  } = props;
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const loggedUserButtons =
    loggedUser?.username === user ? (
      <IconButton
        id="add-edit-button"
        color="inherit"
        aria-label="Edit post"
        onClick={() => setOpenModal(true)}
      >
        <EditIcon />
      </IconButton>
    ) : null;

  return user !== undefined ? (
    <>
      <Card>
        <Link to={`/users/${user}`} className={classes.userLink}>
          <CardHeader
            avatar={<UserAvatar src={reference} size="small" username={user} />}
            title={user}
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
          />
        </Link>
        {loggedUserButtons}
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
      <ModalBox openModal={openModal} closeModal={() => setOpenModal(false)}>
        <EditPost postId={id} successAction={() => setOpenModal(false)} />
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
