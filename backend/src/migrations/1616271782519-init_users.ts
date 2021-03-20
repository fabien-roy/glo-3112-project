require('../models/users.model');

exports.up = async function up(done: any) {
  // TODO : This crashes because users is not registered
  await this('users').update(
    { googleId: { $exists: false } },
    { $set: { googleId: '' } },
    { multi: true },
  );

  // TODO : Add rest of fields

  done();
};

exports.down = async function down(done: any) {
  await this('users').drop();

  done();
};
