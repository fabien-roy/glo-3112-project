import { Model } from 'mongoose';

export const defaultNonExistentField = (
  model: Model<any>,
  field: string,
  defaultValue: any,
) => ({
  updateMany: {
    filter: { field: { $exists: false } },
    update: { $set: { field: defaultValue } },
  },
});
