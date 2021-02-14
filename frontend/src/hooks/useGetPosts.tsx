import { useState, useEffect } from 'react';
import APIService from '../services/APIService';
import { Post } from '../types/posts';

export default function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    retrievePosts();
  });

  // TODO : Handle error
  const retrievePosts = () => {
    APIService.getPosts().then((response) => {
      setPosts(response.data);
    });
  };

  return posts;
}
