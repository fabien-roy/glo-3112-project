import mongoose from 'mongoose';
import { FakeDataGenerator } from './generators/fake.data.generator';

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

db.on('connecting', () => console.log('Connecting to MongoDB...'));

db.on('error', (error) =>
  console.error(`Error in MongoDB connection : ${error}`),
);
db.on('connected', () => console.log('MongoDB connected!'));

db.once('open', async () => {
  console.log('MongoDB connection opened!');

  if (process.env.NODE_ENV !== 'production') {
    await new FakeDataGenerator().generateIfEmpty();
  }
});

db.on('reconnected', () => console.log('MongoDB reconnected!'));

db.on('disconnected', () => {
  console.log('MongoDB disconnected!');
  retryConnectionAfterTimeout();
});

const retryConnectionAfterTimeout = () => {
  console.log('Retrying connection in 5 seconds');
  setTimeout(connectDatabase, retryTimeoutInMilliseconds);
};

export function connectDatabase() {
  mongoose.connect(mongoURL, mongoOptions).catch(() => {
    retryConnectionAfterTimeout();
  });
}
