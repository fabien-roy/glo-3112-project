import { Users } from '../src/models/users.model';

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
