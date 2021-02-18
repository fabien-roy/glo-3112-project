import expressWinston from 'express-winston';
import winston from 'winston';

const options = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
};

export const logger = winston.createLogger(options);

export const appLogger = expressWinston.logger(options);

export const errorLogger = expressWinston.errorLogger(options);
