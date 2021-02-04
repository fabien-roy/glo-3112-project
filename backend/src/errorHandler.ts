import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express';
import { ValidateError } from 'tsoa';

// eslint-disable-next-line consistent-return
export function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void {
  if (err instanceof ValidateError) {
    // TODO : 422?
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
}
