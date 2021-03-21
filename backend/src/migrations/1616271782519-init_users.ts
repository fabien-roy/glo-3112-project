import { Users } from '../connect.models';
import { defaultNonExistentField } from './migrations.utils';

exports.up = async (done: any) => {
  await Users.collection.bulkWrite([
    defaultNonExistentField('googleId', ''),
    defaultNonExistentField('username', ''),
    defaultNonExistentField('email', ''),
    defaultNonExistentField('phoneNumber', ''),
    defaultNonExistentField('firstName', ''),
    defaultNonExistentField('lastName', undefined),
    defaultNonExistentField('description', undefined),
    defaultNonExistentField('avatarReference', undefined),
    defaultNonExistentField('sessionToken', undefined),
    defaultNonExistentField('sessionEndTime', undefined),
  ]);

  done();
};

exports.down = async (done: any) => {
  await Users.collection.drop();

  done();
};
