import { UserLight } from './users';
import { Hashtag } from './hashtags';

export interface SearchResults {
  users: UserLight[];
  hashtags: Hashtag[];
  description: {
    count: number;
  };
}
