import { Users } from '../connect.models';

exports.up = async (done: any) => {
  await Users.updateMany(
    { googleId: { $exists: false } },
    { $set: { googleId: '' } }
  );

  // TODO : Add rest of fields

  done();
};

exports.down = async (done: any) => {
  await Users.collection.drop();

  done();
};
