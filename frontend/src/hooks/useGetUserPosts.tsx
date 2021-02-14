import { useState } from 'react';
import axios from 'axios';
import { Post } from '../types/posts';

// TODO : Move API
const API = 'http://localhost:4000';

// TODO : Should useEffect be used?
// TODO : Should we not get a new user each time?
export default function useGetUserPosts(username: string) {
  const [posts, setPosts] = useState<Post[]>([]);

  axios
    .get<Post[]>(`${API}/users/${username}/posts`)
    .then((response) => setPosts(response.data));

  return posts;
}
