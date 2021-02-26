import fs from 'fs';
const certFileBuf = [fs.readFileSync('./rds-combined-ca-bundle.pem')];

export const mongoOptions = process.env.NODE_ENV === 'production' ? {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
  ssl: true,
  sslCA: certFileBuf,
  replicateSet: 'rs0',
  retryWrite: false,
} : {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
};
