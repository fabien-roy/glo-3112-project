import { useState } from 'react';
import axios from 'axios';
import { Post } from '../types/posts';

// TODO : Move API
const API = 'http://localhost:4000';

// TODO : Should useEffect be used?
// TODO : Should we not get new users each time?
export default function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  axios.get<Post[]>(`${API}/posts`).then((response) => setPosts(response.data));

  return posts;
}
