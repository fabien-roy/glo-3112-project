import { factory } from 'node-factory';
import { PostCreationParams } from '../types/posts';
import { RandomImageSourceFactory } from './random.image.source.factory';

export const PostCreationParamsFactory = factory<PostCreationParams>(
  (fake) => ({
    reference: new RandomImageSourceFactory().make(fake.random.word(), 500),
    description: fake.lorem.words(50),
    usertags: [],
    hashtags: [fake.lorem.word(), fake.lorem.word()],
  }),
);
