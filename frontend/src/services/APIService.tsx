import http from 'http-common';
import { UserModificationParams } from 'types/users';
import { PostCreationParams, PostModificationParams } from 'types/posts';

const getUsers = () => {
  return http.get('/users');
};

const getUser = (username: string) => {
  return http.get(`/users/${username}`);
};

const deleteUser = (username: string) => {
  return http.delete(`/users/${username}`);
};

const createUserPost = (
  username: string,
  postCreationParams: PostCreationParams
) => {
  return http.post(`/users/${username}/posts`, postCreationParams);
};

const getUserPosts = (username: string) => {
  return http.get(`/users/${username}/posts`);
};

const updateUser = (
  username: string,
  userModificationParams: UserModificationParams
) => {
  return http.patch(`/users/${username}`, userModificationParams);
};

const getPosts = () => {
  return http.get('/posts');
};

const getPost = (postId: string) => {
  return http.get(`/posts/${postId}`);
};

const updatePost = (
  postId: string,
  postModificationParams: PostModificationParams
) => {
  return http.patch(`/posts/${postId}`, postModificationParams);
};

const deletePost = (postId: string) => {
  return http.delete(`/posts/${postId}`);
};

export default {
  getUsers,
  getUser,
  createUserPost,
  getUserPosts,
  updateUser,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  deleteUser,
};
