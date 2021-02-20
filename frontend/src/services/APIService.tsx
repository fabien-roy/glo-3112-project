import http from 'http-common';
import { UserCreationParams, UserModificationParams } from 'types/users';
import { PostCreationParams, PostModificationParams } from 'types/posts';

const getUsers = () => {
  return http.get('/users');
};

const getUser = (username: string) => {
  return http.get(`/users/${username}`);
};

const getUserPosts = (props: any) => {
  return http.get(`/users/${props.username}/posts`);
};

const createUser = (userCreationParams: UserCreationParams) => {
  return http.post(`/users`, userCreationParams);
};

const updateUser = (userModificationParams: UserModificationParams) => {
  return http.patch(`/users`, userModificationParams);
};

const getPosts = () => {
  return http.get('/posts');
};

const getPost = (id: string) => {
  return http.get(`/posts/${id}`);
};

const createPost = (postCreationParams: PostCreationParams) => {
  return http.post(`/posts`, postCreationParams);
};

const updatePost = (postModificationParams: PostModificationParams) => {
  return http.patch(`/posts`, postModificationParams);
};

const deletePost = (id: string) => {
  return http.delete(`/posts/${id}`);
};

export default {
  getUsers,
  getUser,
  getUserPosts,
  createUser,
  updateUser,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
