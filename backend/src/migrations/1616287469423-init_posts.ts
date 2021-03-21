import { Posts } from '../connect.models';
import { defaultNonExistentField } from './migrations.utils';

exports.up = async (done: any) => {
  await Posts.collection.bulkWrite([
    defaultNonExistentField(Posts, 'reference', ''),
    defaultNonExistentField(Posts, 'description', ''),
    defaultNonExistentField(Posts, 'hashtags', []),
    defaultNonExistentField(Posts, 'usertags', []),
    defaultNonExistentField(Posts, 'user', undefined),
  ]);

  done();
};

exports.down = async (done: any) => {
  await Posts.collection.drop();

  done();
};
