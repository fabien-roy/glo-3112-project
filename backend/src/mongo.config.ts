import fs from 'fs';
const certFileBuf = [fs.readFileSync('./rds-combined-ca-bundle.pem')];

export const mongoURL = process.env.MONGO_URL || '';

export const mongoOptions =
  process.env.NODE_ENV === 'production'
    ? {
        sslValidate: true,
        sslCA: certFileBuf,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
      }
    : {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
      };
