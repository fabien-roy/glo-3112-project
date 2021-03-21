import { Model } from 'mongoose';

const insertOneFakeDocument = (model: Model<any>, fields: any) => ({
  insertOne: {
    document: { ...fields, fake: true },
  },
});

export const insertManyFakeDocuments = (
  model: Model<any>,
  fieldsArray: Array<any>,
) => fieldsArray.map((fields) => insertOneFakeDocument(model, fields));

export const deleteFakeDocuments = () => ({
  deleteMany: {
    filter: { fake: true },
  },
});
