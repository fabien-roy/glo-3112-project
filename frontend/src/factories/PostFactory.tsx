import { factory } from 'node-factory';
import { Post } from 'types/posts';
import { generateRandomImageSource } from 'util/generateRandomImageSource';

export const PostFactory = factory<Post>((fake) => ({
  _id: fake.random.uuid(),
  reference: generateRandomImageSource(fake.random.word(), 500),
  description: fake.lorem.words(50),
  usertags: [fake.internet.userName(), fake.internet.userName()],
  hashtags: [fake.lorem.word(), fake.lorem.word()],
  user: fake.internet.userName(),
  createdAt: fake.date.past(),
}));
