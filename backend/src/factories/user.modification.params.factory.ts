import { factory } from 'node-factory';
import { UserModificationParams } from '../types/users';
import { RandomImageSourceFactory } from './random.image.source.factory';

export const UserModificationParamsFactory = factory<UserModificationParams>(
  (fake) => ({
    description: fake.random.words(20),
    avatarReference: new RandomImageSourceFactory().make(
      fake.random.word(),
      200,
    ),
  }),
);
