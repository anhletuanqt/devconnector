import { all, takeLatest } from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import { handleRegisterUser, handleUserLogin } from './authSaga';
import {
  handleGetProfile,
  handleGetAllProfile,
  handleRegisterProfile,
  handleAddEducation,
  handleAddExperience,
  handleDeleteExperience,
  handleDeleteEducation
} from './profileSaga';
import {
  handleAddPost,
  handleGetAllPost,
  handleDeletePost,
  handleLikePost,
  handleGetPost,
  handleAddComment
} from './postSaga';
/* ------------- Types ------------- */
import {
  REGISTER_USER,
  LOGIN,
  GET_PROFILE,
  GET_ALL_PROFILE,
  REGISTER_PROFILE,
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
} from '../redux/actions/types';

export default function* root() {
  yield all([
    takeLatest(REGISTER_USER, handleRegisterUser),
    takeLatest(LOGIN, handleUserLogin),
    takeLatest(GET_PROFILE, handleGetProfile),
    takeLatest(GET_ALL_PROFILE, handleGetAllProfile),
    takeLatest(REGISTER_PROFILE, handleRegisterProfile),
    takeLatest(ADD_EDUCATION, handleAddEducation),
    takeLatest(ADD_EXPERIENCE, handleAddExperience),
    takeLatest(DELETE_EXPERIENCE, handleDeleteExperience),
    takeLatest(DELETE_EDUCATION, handleDeleteEducation),
    takeLatest(ADD_POST, handleAddPost),
    takeLatest(GET_ALL_POST, handleGetAllPost),
    takeLatest(DELETE_POST, handleDeletePost),
    takeLatest(LIKE_POST, handleLikePost),
    takeLatest(GET_POST, handleGetPost),
    takeLatest(ADD_COMMENT, handleAddComment)
    // fork(watchDeleteTime)
  ]);
}
