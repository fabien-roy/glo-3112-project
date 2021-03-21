import { Posts } from '../connect.models';
import { defaultNonExistentField } from './migrations.utils';

exports.up = async (done: any) => {
  await Posts.collection.bulkWrite([
    defaultNonExistentField('reference', ''),
    defaultNonExistentField('description', ''),
    defaultNonExistentField('hashtags', []),
    defaultNonExistentField('usertags', []),
    defaultNonExistentField('user', undefined),
  ]);

  done();
};

exports.down = async (done: any) => {
  await Posts.collection.drop();

  done();
};
