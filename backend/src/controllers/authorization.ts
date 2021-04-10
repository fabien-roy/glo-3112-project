import { User } from '../types/users';
import { UnauthenticatedError, UnauthorizedError } from '../types/errors';
import { logger } from '../middlewares/logger';
import { PostsRepository } from '../repositories/posts.repository';

const postsRepository: PostsRepository = new PostsRepository();

export const validateAuthentication = function (token?: User) {
  logger.info(`Validating Authentication: token=${token}`);
  if (!token) {
    throw new UnauthenticatedError();
  }
};

export const validateAuthorizationByUsername = function (
  username: string,
  token?: User,
) {
  logger.info(`Validating Authorization: username=${username}, token=${token}`);
  if (!token) {
    throw new UnauthenticatedError();
  }
  if (token.username !== username) {
    throw new UnauthorizedError();
  }
};

export const validateAuthorizationByPostId = async function (
  postId: string,
  token?: User,
) {
  logger.info(`Validating Authorization: postId=${postId}, token=${token}`);
  if (!token) {
    throw new UnauthenticatedError();
  }
  const post = await postsRepository.getPost(postId);
  if (!post || token.username !== post.user) {
    throw new UnauthorizedError();
  }
};
