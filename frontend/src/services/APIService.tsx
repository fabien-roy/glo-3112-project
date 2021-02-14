import http from 'http-common';
import { UserCreationParams } from 'types/users';

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
  getPosts,
  getPost,
};
