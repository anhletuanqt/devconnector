import {
  REGISTER_USER,
  LOGIN,
  SET_CURRENT_USER,
  LOG_OUT,
  REGISTER_PROFILE,
  RESET_PROFILE,
  GET_PROFILE,
  GET_ALL_PROFILE,
  ADD_EXPERIENCE,
  ADD_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  ADD_POST,
  GET_ALL_POST,
  DELETE_POST,
  LIKE_POST,
  GET_POST,
  ADD_COMMENT
} from './types';

const registerUser = (payload, history) => ({
  type: REGISTER_USER,
  payload,
  history
});

const userLogin = payload => ({
  type: LOGIN,
  payload
});

const setCurrentUser = payload => ({
  type: SET_CURRENT_USER,
  payload
});

const userLogout = () => ({
  type: LOG_OUT
});

const registerProfile = (payload, history) => ({
  type: REGISTER_PROFILE,
  payload,
  history
});

const resetProfile = () => ({
  type: RESET_PROFILE
});

const getProfile = id => ({
  type: GET_PROFILE,
  payload: id
});

const getAllProfile = () => ({
  type: GET_ALL_PROFILE
});

const addExperience = (payload, history) => ({
  type: ADD_EXPERIENCE,
  payload,
  history
});

const addEducation = (payload, history) => ({
  type: ADD_EDUCATION,
  payload,
  history
});

const deleteExperience = payload => ({
  type: DELETE_EXPERIENCE,
  payload
});

const deleteEducation = payload => ({
  type: DELETE_EDUCATION,
  payload
});

const addPost = payload => ({
  type: ADD_POST,
  payload
});

const getAllPost = () => ({
  type: GET_ALL_POST
});

const getPost = payload => ({
  type: GET_POST,
  payload
});

const deletePost = id => ({
  type: DELETE_POST,
  payload: id
});

const likePost = id => ({
  type: LIKE_POST,
  payload: id
});

const addComment = payload => ({
  type: ADD_COMMENT,
  payload
});

export {
  registerUser,
  userLogin,
  setCurrentUser,
  userLogout,
  registerProfile,
  resetProfile,
  getProfile,
  getAllProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  addPost,
  getAllPost,
  deletePost,
  likePost,
  getPost,
  addComment
};
