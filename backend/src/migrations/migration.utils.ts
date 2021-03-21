import { Model } from 'mongoose';

export const defaultNonExistentField = async (
  model: Model<any>,
  field: string,
  defaultValue: any,
) => {
  await model.updateMany(
    { field: { $exists: false } },
    { $set: { field: defaultValue } },
  );
};
