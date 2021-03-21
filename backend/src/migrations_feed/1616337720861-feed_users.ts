import { Users } from '../connect.models';
import { insertManyDocuments } from './migrations.feed.utils';
import { UserFactory } from '../factories/users.factory';

const AMOUNT_OF_USERS_TO_FEED = 10;

exports.up = async (done: any) => {
  const insertOperations = insertManyDocuments(
    Users,
    UserFactory.make(AMOUNT_OF_USERS_TO_FEED),
  );
  await Users.collection.bulkWrite(insertOperations);

  done();
};

exports.down = async (done: any) => {
  // TODO : If data was flagged as "fake" (new field?), we could remove them all in one shot without having the reference hack.

  // TODO : Remove users with reference hack

  done();
};
