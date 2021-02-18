import { factory } from 'node-factory';
import { PostCreationParams, SavedPost } from '../types/posts';

// TODO : node-factory might only be necessary for frontend. We'll see.

export const PostFactory = factory<SavedPost>((fake) => ({
  id: fake.random.uuid(),
  reference: fake.random.uuid(),
  description: fake.lorem.words(50),
  hashtags: [fake.lorem.word(), fake.lorem.word()],
  usertags: [fake.internet.userName()],
  user: fake.internet.userName(),
  createdAt: fake.date.between(
    new Date('2015-01-01T00:00:00'),
    new Date('2025-01-01T00:00:00'),
  ),
}));

export const PostCreationRequestFactory = factory<PostCreationParams>(
  (fake) => ({
    reference: fake.random.uuid(),
    description: fake.lorem.words(50),
    usertags: [fake.internet.userName()],
    hashtags: [fake.lorem.word(), fake.lorem.word()],
  }),
);
