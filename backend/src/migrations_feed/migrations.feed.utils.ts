import { Model } from 'mongoose';

const insertOneDocument = (model: Model<any>, fields: any) => ({
  insertOne: {
    document: { ...fields },
  },
});

export const insertManyDocuments = (
  model: Model<any>,
  fieldsArray: Array<any>,
) => fieldsArray.map((fields) => insertOneDocument(model, fields));
