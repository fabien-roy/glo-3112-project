import mongoose from 'mongoose';

// TODO : Get Mongo URL with env vars
const mongoURL = 'mongodb://database:27017';

// TODO : Get Mongo credentials with env vars
const mongoOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'admin',
  pass: 'admin',
};

const retryTimeoutInMilliseconds = 5000;

const db = mongoose.connection;

db.on('connecting', () => console.log('Connecting to MongoDB...'));

db.on('error', (error) => {
  console.error('Error in MongoDB connection : ' + error);
  mongoose.disconnect();
});

db.on('connected', () => console.log('MongoDB connected!'));

db.once('open', () => console.log('MongoDB connection opened!'));

db.on('reconnected', () => console.log('MongoDB reconnected!'));

db.on('disconnected', () => {
  console.log('MongoDB disconnected! - Retrying in 5 seconds');
  setTimeout(connectDatabase, retryTimeoutInMilliseconds);
});

export function connectDatabase() {
  mongoose.connect(mongoURL, mongoOptions);
}
