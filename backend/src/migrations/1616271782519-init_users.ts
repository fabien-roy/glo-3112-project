import { Users } from '../connect.models';
import { defaultNonExistentField } from './migrations.utils';

exports.up = async (done: any) => {
  await Users.collection.bulkWrite([
    defaultNonExistentField(Users, 'googleId', ''),
    defaultNonExistentField(Users, 'username', ''),
    defaultNonExistentField(Users, 'email', ''),
    defaultNonExistentField(Users, 'phoneNumber', ''),
    defaultNonExistentField(Users, 'firstName', ''),
    defaultNonExistentField(Users, 'lastName', undefined),
    defaultNonExistentField(Users, 'description', undefined),
    defaultNonExistentField(Users, 'avatarReference', undefined),
    defaultNonExistentField(Users, 'sessionToken', undefined),
    defaultNonExistentField(Users, 'sessionEndTime', undefined),
  ]);

  done();
};

exports.down = async (done: any) => {
  await Users.collection.drop();

  done();
};
