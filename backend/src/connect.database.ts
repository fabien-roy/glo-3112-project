import mongoose from 'mongoose';
import { FakeDataGenerator } from './generators/fake.data.generator';
import { logger } from './logger';

const mongoURL = process.env.MONGO_URL || '';

const mongoOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
};

const retryTimeoutInMilliseconds = 5000;

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

const retryConnectionAfterTimeout = () => {
  logger.info('Retrying connection in 5 seconds');
  setTimeout(connectDatabase, retryTimeoutInMilliseconds);
};

export function connectDatabase() {
  mongoose.connect(mongoURL, mongoOptions).catch(() => {
    retryConnectionAfterTimeout();
  });
}
