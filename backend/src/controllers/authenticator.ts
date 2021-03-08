import { User } from '../types/users';
import { UnauthorizedError } from '../types/errors';
import { logger } from '../middlewares/logger';

export const validateAuthorization = function (username: string, token?: User) {
  logger.info(`Validating Authorization: username=${username}, token=${token}`);
  if (!token || token.username !== username) {
    throw new UnauthorizedError('UNAUTHORIZED');
  }
};
