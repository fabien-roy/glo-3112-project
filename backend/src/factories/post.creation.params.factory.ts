import { factory } from 'node-factory';
import { PostCreationParams } from '../types/posts';

const RANDOM_IMAGE_SOURCE = 'https://picsum.photos/500';

// TODO : Use to create fake posts
export const PostCreationParamsFactory = factory<PostCreationParams>(
  (fake) => ({
    reference: RANDOM_IMAGE_SOURCE,
    description: fake.lorem.words(50),
    usertags: [],
    hashtags: [fake.lorem.word(), fake.lorem.word()],
  }),
);
