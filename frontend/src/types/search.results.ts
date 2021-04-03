import { SimpleUser } from './users';
import { Hashtag } from './hashtags';

export interface SearchResults {
  users: SimpleUser[];
  hashtags: Hashtag[];
  description: {
    count: number;
  };
}

export const initialSearchResults = {
  users: [],
  hashtags: [],
  description: {
    count: 0,
  },
};

export interface SearchQueryParams {
  value: string;
}
