import { Users } from '../models/users.model';

exports.up = async (done: any) => {
  await Users.updateMany(
    { googleId: { $exists: false } },
    { $set: { googleId: '' } },
    { multi: true },
  );

  // TODO : Add rest of fields

  done();
};

exports.down = async (done: any) => {
  await Users.deleteMany();

  done();
};
