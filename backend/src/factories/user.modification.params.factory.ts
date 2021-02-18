import { factory } from 'node-factory';
import { UserModificationParams } from '../types/users';

const RANDOM_IMAGE_SOURCE = 'https://picsum.photos/200';

export const UserModificationParamsFactory = factory<UserModificationParams>(
  (fake) => ({
    description: fake.random.words(20),
    avatarReference: RANDOM_IMAGE_SOURCE,
  }),
);
