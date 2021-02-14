import http from '../http-common';

const getUsers = () => {
  return http.get('/users');
};

const getUser = (username) => {
  return http.get(`/users/${username}`);
};

const getUserPosts = (username) => {
  return http.get(`/users/${username}/posts`);
};

const getPosts = () => {
  return http.get('/posts');
};

const getPost = (id) => {
  return http.get(`/posts/${id}`);
};

export default {
  getUsers,
  getUser,
  getUserPosts,
  getPosts,
  getPost,
};
