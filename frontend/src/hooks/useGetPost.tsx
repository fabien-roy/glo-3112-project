import { useState, useEffect } from 'react';
import APIService from '../services/APIService';
import { Post } from '../types/posts';

export default function useGetPost(postId: string) {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    retrievePost();
  });

  // TODO : Handle error
  const retrievePost = () => {
    APIService.getPost(postId).then((response) => {
      setPost(response.data);
    });
  };

  return post;
}
