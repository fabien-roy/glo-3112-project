import { httpWithCredentials } from 'http-common';
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
  return httpWithCredentials.get('/tokenInfo');
};

const getUsers = (queryParams: UserQueryParams) => {
  return httpWithCredentials.get('/users', { params: queryParams });
};

const getUser = (username: string) => {
  return httpWithCredentials.get(`/users/${username}`);
};

const createUserPost = (
  username: string,
  postCreationParams: PostCreationParams
) => {
  return httpWithCredentials.post(
    `/users/${username}/posts`,
    postCreationParams
  );
};

const getUserPosts = (username: string) => {
  return httpWithCredentials.get(`/users/${username}/posts`);
};

const updateUser = (
  username: string,
  userModificationParams: UserModificationParams
) => {
  return httpWithCredentials.patch(
    `/users/${username}`,
    userModificationParams
  );
};

const getPosts = (postQueryParams?: PostQueryParams) => {
  return httpWithCredentials.get(
    `/posts${objectToQueryString(postQueryParams)}`
  );
};

const getPost = (postId: string) => {
  return httpWithCredentials.get(`/posts/${postId}`);
};

const updatePost = (
  postId: string,
  postModificationParams: PostModificationParams
) => {
  return httpWithCredentials.patch(`/posts/${postId}`, postModificationParams);
};

const deletePost = (postId: string) => {
  return httpWithCredentials.delete(`/posts/${postId}`);
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
  getLoggedUser,
};
