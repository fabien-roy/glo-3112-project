import fs from 'fs';
const certFileBuf = [fs.readFileSync('./rds-combined-ca-bundle.pem')];

const baseMongoURL = process.env.MONGO_URL || '';

export const mongoURL =
  process.env.NODE_ENV === 'production'
    ? `${baseMongoURL}/?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred`
    : baseMongoURL;

export const mongoOptions =
  process.env.NODE_ENV === 'production'
    ? {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        sslValidate: true,
        sslCA: certFileBuf,
      }
    : {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
      };
