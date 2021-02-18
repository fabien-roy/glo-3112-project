import { factory } from 'node-factory';
import { PostCreationParams } from '../types/posts';

// TODO : node-factory might only be necessary for frontend. We'll see.

const RANDOM_IMAGE_SOURCE = 'https://picsum.photos/500';

export const PostCreationParamsFactory = factory<PostCreationParams>(
  (fake) => ({
    reference: RANDOM_IMAGE_SOURCE,
    description: fake.lorem.words(50),
    usertags: [],
    hashtags: [fake.lorem.word(), fake.lorem.word()],
  }),
);
