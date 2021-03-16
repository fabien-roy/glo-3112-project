import { http } from 'http-common';
import { UserModificationParams, UserQueryParams } from 'types/users';
import {
  PostCreationParams,
  PostModificationParams,
  PostQueryParams,
} from 'types/posts';

const objectToQueryString = (obj) => {
  if (typeof obj !== 'object') return '';

  return `?${Object.keys(obj)
    .map((key) => {
      return obj[key] !== undefined
        ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        : '';
    })
    .filter(Boolean)
    .join('&')}`;
};

const getLoggedUser = () => {
  return http.get('/tokenInfo');
};

const getUsers = (queryParams: UserQueryParams) => {
  return http.get('/users', { params: queryParams });
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

const getPosts = (postQueryParams?: PostQueryParams) => {
  return http.get(`/posts${objectToQueryString(postQueryParams)}`);
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
  getLoggedUser,
};
