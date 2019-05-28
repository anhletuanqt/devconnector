import http from './http';

const API_ROOT = 'http://localhost:3000';

export const registerUser = payload => {
  return http.post(`${API_ROOT}/api/user/register`, payload);
};

export const userLogin = payload => {
  return http.post(`${API_ROOT}/api/user/login`, payload);
};

export const registerProfile = payload => {
  return http.post(`${API_ROOT}/api/profile`, payload);
};

export const getProfile = user_id => {
  return http.get(`${API_ROOT}/api/profile/user/${user_id}`);
};

export const getAllProfile = () => {
  return http.get(`${API_ROOT}/api/profile/all`);
};

export const addExperience = payload => {
  return http.post(`${API_ROOT}/api/profile/experience`, payload);
};

export const addEducation = payload => {
  return http.post(`${API_ROOT}/api/profile/education`, payload);
};

export const deleteExperience = id => {
  return http.delete(`${API_ROOT}/api/profile/experience/${id}`);
};

export const deleteEducation = id => {
  return http.delete(`${API_ROOT}/api/profile/education/${id}`);
};

export const addPost = payload => {
  return http.post(`${API_ROOT}/api/post`, payload);
};

export const getAllPost = payload => {
  return http.get(`${API_ROOT}/api/post`);
};

export const getPost = id => {
  return http.get(`${API_ROOT}/api/post/${id}`);
};

export const deletePost = id => {
  return http.delete(`${API_ROOT}/api/post/${id}`);
};

export const likePost = id => {
  return http.post(`${API_ROOT}/api/post/like/${id}`);
};

export const addComment = payload => {
  console.log('payload: ', payload);
  return http.post(`${API_ROOT}/api/post/comment/${payload.id}`, payload.body);
};
