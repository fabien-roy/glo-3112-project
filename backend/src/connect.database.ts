import mongoose from 'mongoose';
import { FakeDataGenerator } from './generators/fake.data.generator';
import { logger } from './middlewares/logger';

const mongoURL = process.env.MONGO_URL || '';

const mongoOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
};

const db = mongoose.connection;

db.on('connecting', () => logger.info('Connecting to MongoDB...'));

db.on('error', (error) =>
  logger.error(`Error in MongoDB connection : ${error}`),
);
db.on('connected', () => logger.info('MongoDB connected!'));

db.once('open', async () => {
  logger.info('MongoDB connection opened!');

  if (process.env.NODE_ENV !== 'production') {
    await new FakeDataGenerator().generateIfEmpty();
  }
});

db.on('reconnected', () => logger.info('MongoDB reconnected!'));

db.on('disconnected', () => {
  logger.info('MongoDB disconnected!');
  retryConnectionAfterTimeout();
});

const MAX_NUMBER_OF_TRIES = 10;
const FACTOR = 1.5;
const DEFAULT_RETRY_TIMEOUT = 5000;
const DEFAULT_NUMBER_OF_TRIES = 0;

let retryTimeout = DEFAULT_RETRY_TIMEOUT;
let numberOfTries = DEFAULT_NUMBER_OF_TRIES;

const retryConnectionAfterTimeout = () => {
  if (numberOfTries < MAX_NUMBER_OF_TRIES) {
    logger.info('Retrying connection');
    setTimeout(connectDatabase, retryTimeout);

    retryTimeout *= FACTOR;
    numberOfTries++;
  }
};

export function connectDatabase() {
  mongoose
    .connect(mongoURL, mongoOptions)
    .then(() => {
      retryTimeout = DEFAULT_RETRY_TIMEOUT;
      numberOfTries = DEFAULT_NUMBER_OF_TRIES;
    })
    .catch(() => {
      retryConnectionAfterTimeout();
    });
}
