import { factory } from 'node-factory';
import { PostCreationRequest, SavedPost } from '../types/posts';

// TODO : node-factory might only be necessary for frontend. We'll see.

export const PostFactory = factory<SavedPost>((fake) => ({
  id: fake.random.uuid(),
  reference: fake.random.uuid(),
  description: fake.lorem.words(50),
  tags: [fake.lorem.words(10), fake.lorem.words(10)],
  user: fake.internet.username(),
  createdAt: fake.date.between(
    new Date('2015-01-01T00:00:00'),
    new Date('2025-01-01T00:00:00'),
  ),
}));

export const PostCreationRequestFactory = factory<PostCreationRequest>(
  (fake) => ({
    reference: fake.random.uuid(),
    description: fake.lorem.words(50),
    tags: [fake.lorem.words(10), fake.lorem.words(10)],
  }),
);
