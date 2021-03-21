import { factory } from 'node-factory';
import { RandomImageSourceFactory } from './random.image.source.factory';
import { SavedPost } from "../types/posts";

export const PostFactory = factory<SavedPost>((fake) => ({
  id: fake.random.uuid(),
  reference: new RandomImageSourceFactory().make(fake.random.word(), 500),
  description: fake.lorem.words(50),
  usertags: [],
  hashtags: [fake.lorem.word(), fake.lorem.word()],
  user: '',
  createdAt: new Date(),
}));
