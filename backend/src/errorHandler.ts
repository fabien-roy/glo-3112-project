import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express';
import { ValidateError } from 'tsoa';
import {
  BadRequestError,
  DuplicateUserError,
  InvalidEntityError,
} from './types/errors';

// eslint-disable-next-line consistent-return
export function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void {
  if (err instanceof ValidateError) {
    return res.status(400).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof BadRequestError) {
    return res.status(400).json({
      message: 'Bad Request',
      details: err.message,
    });
  }
  if (err instanceof InvalidEntityError) {
    return res.status(404).send({ message: err.message });
  }
  if (err instanceof DuplicateUserError) {
    return res.status(409).send({ message: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
}
