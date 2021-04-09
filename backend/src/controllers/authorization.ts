import { User } from '../types/users';
import { UnauthenticatedError, UnauthorizedError } from '../types/errors';
import { logger } from '../middlewares/logger';
import { MongoPostsRepository } from '../repositories/mongo/mongo.posts.repository';
import { PostsRepository } from '../repositories/posts.repository';

const postsRepository: PostsRepository = new MongoPostsRepository();

export const validateAuthentication = function (user?: User) {
  logger.info(`Validating Authentication: token=${JSON.stringify(user)}`);
  if (!user) {
    throw new UnauthenticatedError();
  }
};

export const validateAuthorizationByUsername = function (
  username: string,
  user?: User,
) {
  logger.info(
    `Validating Authorization: username=${username}, token=${JSON.stringify(
      user,
    )}`,
  );
  if (!user) {
    throw new UnauthenticatedError();
  }
  if (user.username !== username) {
    throw new UnauthorizedError();
  }
};

export const validateAuthorizationByPostId = async function (
  postId: string,
  user?: User,
) {
  logger.info(
    `Validating Authorization: postId=${postId}, token=${JSON.stringify(user)}`,
  );
  if (!user) {
    throw new UnauthenticatedError();
  }
  const post = await postsRepository.getPost(postId);
  if (!post || user.username !== post.user) {
    throw new UnauthorizedError();
  }
};
