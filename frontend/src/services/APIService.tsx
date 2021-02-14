import http from 'http-common';
import { UserCreationParams } from 'types/users';
import { PostCreationParams } from 'types/posts';

const createUser = (userCreationParams: UserCreationParams) => {
  return http.post(`/users`, userCreationParams);
};

const getUsers = () => {
  return http.get('/users');
};

const getUser = (username: string) => {
  return http.get(`/users/${username}`);
};

const getUserPosts = (username: string) => {
  return http.get(`/users/${username}/posts`);
};

const createPost = (postCreationParams: PostCreationParams) => {
  return http.post(`/posts`, postCreationParams);
};

const getPosts = () => {
  return http.get('/posts');
};

const getPost = (id: string) => {
  return http.get(`/posts/${id}`);
};

export default {
  createUser,
  getUsers,
  getUser,
  getUserPosts,
  createPost,
  getPosts,
  getPost,
};
