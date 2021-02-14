import { useState } from 'react';
import axios from 'axios';
import { Post } from 'types/posts';

// TODO : Move API
const API = 'http://localhost:4000';

// TODO : Should useEffect be used?
// TODO : Should we not get a new post each time?
export default function usePosts(id: string) {
  const [post, setPost] = useState<Post>();
  const [posts] = useState<Post[]>([]);

  const foundPost = posts.find((p) => p.id === id);

  if (foundPost) {
    setPost(foundPost);
  } else {
    axios
      .get<Post>(`${API}/posts/${id}`)
      .then((response) => setPost(response.data));
  }

  return post;
}
