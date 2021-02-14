import { useState, useEffect } from 'react';
import APIService from '../services/APIService';
import { Post } from '../types/posts';

// TODO : Shouldn't getUser also obtain user's posts?
export default function useGetUserPosts(username: string) {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    retrieveUserPosts();
  });

  // TODO : Handle error
  const retrieveUserPosts = () => {
    APIService.getUserPosts(username).then((response) => {
      setPosts(response.data);
    });
  };

  return posts;
}
