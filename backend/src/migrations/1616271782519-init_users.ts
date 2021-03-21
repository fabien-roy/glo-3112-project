import { Users } from '../connect.models';
import { defaultNonExistentField } from './migration.utils';

exports.up = async (done: any) => {
  await defaultNonExistentField(Users, 'googleId', '');
  await defaultNonExistentField(Users, 'username', '');
  await defaultNonExistentField(Users, 'email', '');
  await defaultNonExistentField(Users, 'phoneNumber', '');
  await defaultNonExistentField(Users, 'firstName', '');
  await defaultNonExistentField(Users, 'lastName', undefined);
  await defaultNonExistentField(Users, 'description', undefined);
  await defaultNonExistentField(Users, 'avatarReference', undefined);
  await defaultNonExistentField(Users, 'sessionToken', undefined);
  await defaultNonExistentField(Users, 'sessionEndTime', undefined);

  done();
};

exports.down = async (done: any) => {
  await Users.collection.drop();

  done();
};
